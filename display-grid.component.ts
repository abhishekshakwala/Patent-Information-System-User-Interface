import { Component, OnInit, Input } from '@angular/core';
import { PatentAppService } from '../service/patent-app.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'app-display-grid',
    templateUrl: './display-grid.component.html',
    styleUrls: ['./display-grid.component.css']
})
export class DisplayGridComponent implements OnInit {

    cols: any[];

    patentData: any;

    allPatentData: any;

    rangeDates: Date[];

    selectedColumns: any[];

    selectedDocumentType: any[];

    uniqueDocumentType = [];

    filterOptions = [];

    response: any;

    documentTypeCount: any;

    applicationPatent: any;

    grantPatent: any;

    color = [];

    documentType = [];

    pieChartData: any;

    textSearch: any;

    totalRecords: number;

    loading: boolean;

    constructor(private patentAppService: PatentAppService) {

    }

    ngOnInit() {

        this.getChartData('getPatentsDocumentType');

        this.getAllPatentRecords('getAllPatent');

        this.loading = true;

        this.cols = [
            { field: 'applicationType', header: 'Application Type', filterType: 'text' },
            { field: 'documentId', header: 'Document Id', filterType: 'text' },
            { field: 'applicationNumber', header: 'Application Number', filterType: 'text' },
            { field: 'documentType', header: 'Document Type', filterType: 'multiselect' },
            { field: 'patentNumber', header: 'Patent Number', filterType: 'text' },
            { field: 'publicationDate', header: 'Publication Date' },
            { field: 'documentDate', header: 'Document Date' },
            { field: 'productionDate', header: 'Production Date' },
            { field: 'applicationDate', header: 'Application Date' },
            { field: 'applicant', header: 'Applicant', filterType: 'text' },
            { field: 'inventor', header: 'Inventor', filterType: 'text' },
            { field: 'assignee', header: 'Assignee', filterType: 'text' },
            { field: 'title', header: 'Title', filterType: 'text' },
            { field: 'archiveUrl', header: 'Archive URL' },
            { field: 'pdfPath', header: 'Pdf Path' },
            { field: 'year', header: 'Year', filterType: 'text' }
        ];

        this.selectedColumns = this.cols;

        this.selectedDocumentType = [];

        console.log(this.selectedDocumentType);
    }

    selectData(event) {
        console.log(event);
        console.log(this.documentType[event.element._index]);

        const clickData = this.documentType[event.element._index].toLowerCase();
        if (clickData === 'application') {
            this.patentData = this.applicationPatent;
            this.filterOptions = [];
            this.filterOptions.push({ label: 'application', value: 'application' });
        } else if (clickData === 'grant') {
            this.patentData = this.grantPatent;
            this.filterOptions = [];
            this.filterOptions.push({ label: 'grant', value: 'grant' });
        }

    }

    getAllPatentRecords(serviceURL) {
        this.patentAppService.getAllPatentRecords(serviceURL).subscribe((response) => {
            this.patentData = response['patentList'];

            this.loading = true;
            this.filterOptions = [];
            this.uniqueDocumentType = [];
            for (let i = 0; i < this.patentData.length; i++) {
                this.patentData[i]['publicationDate'] = new Date(this.patentData[i]['publicationDate']);
                this.patentData[i]['productionDate'] = new Date(this.patentData[i]['productionDate']);
                this.patentData[i]['documentDate'] = new Date(this.patentData[i]['documentDate']);
                this.patentData[i]['applicationDate'] = new Date(this.patentData[i]['applicationDate']);
                if (!(this.uniqueDocumentType.includes(this.patentData[i]['documentType']))) {
                    this.uniqueDocumentType.push(this.patentData[i]['documentType']);
                    this.filterOptions.push({ label: this.patentData[i]['documentType'], value: this.patentData[i]['documentType'] });
                }
            }
            console.log(this.uniqueDocumentType);
            console.log(this.patentData);
            this.allPatentData = this.patentData;
            this.loading = false;
        });
    }

    getChartData(serviceURL) {
        this.patentAppService.getDocumentTypeData(serviceURL).subscribe((response) => {
            this.response = JSON.stringify(response['data']);
            this.response = JSON.parse(this.response);
            console.log(this.response['application']);
            this.applicationPatent = this.response['application'];
            this.convertToDate(this.applicationPatent);
            this.grantPatent = this.response['grant'];
            this.convertToDate(this.grantPatent);

            for (let i = 0; i < 2; i++) {
                this.color.push('#' + Math.floor(Math.random() * 16777215).toString(16));
            }
            console.log(this.color);

            this.documentType = ['Application', 'Grant'];

            this.pieChartData = {
                labels: this.documentType,
                datasets: [{
                    data: [this.applicationPatent.length, this.grantPatent.length],
                    backgroundColor: this.color,
                    hoverBackgroundColor: this.color,
                    label: 'Patent Document Type Distribution'
                }]
            };
            console.log(this.pieChartData);
        });
    }

    convertToDate(patentData) {
        for (let i = 0; i < patentData.length; i++) {
                patentData[i]['publicationDate'] = new Date(patentData[i]['publicationDate']);
                patentData[i]['productionDate'] = new Date(patentData[i]['productionDate']);
                patentData[i]['documentDate'] = new Date(patentData[i]['documentDate']);
                patentData[i]['applicationDate'] = new Date(patentData[i]['applicationDate']);
            }
    }

    getAllDataClick(event) {
        this.patentData = [];
        this.loading = true;
        this.getAllPatentRecords('getAllPatent');

        this.getChartData('getPatentsDocumentType');
    }

    receiveSearch(event) {
        console.log(event);
        this.textSearch = event;
        this.patentData = [];
        this.filterOptions = [];
        this.uniqueDocumentType = [];
        this.loading = true;
        this.getAllPatentRecords('getAllPatent?year=' + this.textSearch);
    }

/*  Lazy loading code to improve the rendering performance

    Adding these parameters to p-table element:
    [lazy]="true" (onLazyLoad)="loadLazy($event)" [loading]="loading" [totalRecords]="totalRecords

    loadLazy(event: LazyLoadEvent) {
        this.loading = true;
        const url = 'getAllPatent?start=' + event.first + '&rows=' + event.rows;
        console.log(url);
        this.patentAppService.getAllPatentRecords(url).subscribe((response) => {
            this.patentData = response['patentList'];

            this.filterOptions = [];
            this.uniqueDocumentType = [];
            for (let i = 0; i < this.patentData.length; i++) {
                this.patentData[i]['publicationDate'] = new Date(this.patentData[i]['publicationDate']);
                this.patentData[i]['productionDate'] = new Date(this.patentData[i]['productionDate']);
                this.patentData[i]['documentDate'] = new Date(this.patentData[i]['documentDate']);
                this.patentData[i]['applicationDate'] = new Date(this.patentData[i]['applicationDate']);
                if (!(this.uniqueDocumentType.includes(this.patentData[i]['documentType']))) {
                    this.uniqueDocumentType.push(this.patentData[i]['documentType']);
                    this.filterOptions.push({ label: this.patentData[i]['documentType'], value: this.patentData[i]['documentType'] });
                }
            }
            console.log(this.uniqueDocumentType);
            console.log(this.patentData);
            this.allPatentData = this.patentData;
            this.loading = false;
        });
    }

    */
}
