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

        console.log(userstoriesSecondList);

        // add to second list
        userstoriesSecondList.push(userstory);

        console.log(userstoriesSecondList);

        // remove from first list
        userstoriesFirstList.splice(storyId, 1);

        if (listId == 0) {
            this.saveList(0, userstoriesFirstList);
            this.saveList(1, userstoriesSecondList);
        }

        if (listId == 1) {
            this.saveList(1, userstoriesFirstList);
            this.saveList(2, userstoriesSecondList);
        }

        if (listId == 2) {
            this.saveList(2, userstoriesFirstList);
            this.saveList(3, userstoriesSecondList);
        }

        return;
    }

    saveList(listId, list) {
        const userstories = JSON.parse(localStorage.getItem('scrumboard'));
        userstories[listId] = list;

        localStorage.setItem('scrumboard', JSON.stringify(userstories));
        this.refresh.emit(null);
    }
}
