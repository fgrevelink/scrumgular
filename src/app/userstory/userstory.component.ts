import {Component, Input, OnInit} from '@angular/core';
import {Userstory} from '../userstory';
import {StorageService} from '../storage.service';

@Component({
    selector: 'app-userstory',
    templateUrl: './userstory.component.html',
    styleUrls: ['./userstory.component.css']
})
export class UserstoryComponent implements OnInit {
    @Input() story:  Userstory;
    @Input() listId: number;
    @Input() key:    number;

    advance() {
        console.log('advancing')
        this.storageService.advanceStory(this.listId, this.key);
    }

    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
        // console.log(this.listId, this.key);
    }

}
