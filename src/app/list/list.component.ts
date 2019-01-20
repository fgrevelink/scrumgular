import {Component, Input, OnInit} from '@angular/core';
import {Userstory} from '../userstory';
import {NgForm} from '@angular/forms';
import {StorageService} from '../storage.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @Input() title: string;
    @Input() id: number;


    subscription: any;
    userstories: Userstory[];
    userstory = new Userstory(1, '', '', 1);

    constructor(private storageService: StorageService) {
    }

    submit() {
        this.storageService.addStory(this.id, this.userstory);
        this.userstory = new Userstory(1, '', '', 1);
    }

    refreshList() {
        this.userstories = this.storageService.getStories(this.id);
    }

    ngOnInit() {
        this.refreshList();
        this.subscription = this.storageService.refresh.subscribe(item => this.refreshList());
    }
}
