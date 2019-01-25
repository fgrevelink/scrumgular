import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    @Output() refresh: EventEmitter<any> = new EventEmitter();

    constructor() {
        if (null === localStorage.getItem('scrumboard')) {
            console.log('There are no stories yet, making an object in storage..');
            localStorage.setItem('scrumboard',
                JSON.stringify([[], [], [], []])
            );
        }
    }

    getStories(id) {
        let userstories = JSON.parse(localStorage.getItem('scrumboard'));
        userstories = userstories[id];
        if (undefined === userstories) {
            return [];
        }
        return userstories;
    }

    addStory(listId, userStory) {
        const userstories = this.getStories(listId);
        userstories.push(userStory);
        this.saveList(listId, userstories);
    }

    advanceStory(listId, storyId) {
        if (listId > 2) {
            return;
        }

        // get story
        const userstoriesFirstList = this.getStories(listId);
        const userstoriesSecondList = this.getStories(Number(listId) + 1);

        // remove from first list
        const userstory = userstoriesFirstList[storyId];
        if (null == userstory) {
            return;
        }

        // add to second list
        userstoriesSecondList.push(userstory);

        // remove from first list
        userstoriesFirstList.splice(storyId, 1);

        // save both lists
        this.saveList(listId, userstoriesFirstList);
        this.saveList(Number(listId) + 1, userstoriesSecondList);

        return;
    }

    saveList(listId, list) {
        const userstories = JSON.parse(localStorage.getItem('scrumboard'));
        userstories[listId] = list;

        localStorage.setItem('scrumboard', JSON.stringify(userstories));
        this.refresh.emit(null);
    }
}
