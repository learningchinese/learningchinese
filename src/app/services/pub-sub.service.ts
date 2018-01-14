import { Injectable } from '@angular/core';

/**
 * PubSubService - Allow subcribe function on a topic, all functions subcribe will be invoked when the topic published
 */
@Injectable()
export class PubSubService {

    public static get TOPICS() {
        return {
            NAVIGAION_TAB_CHANGE: "NAVIGAION_TAB_CHANGE"
        };
    }

    private topics: Map<string, Function[]> = new Map<string, Function[]>();
    constructor() { }

    /**
     * Subcribe a fuction event on topic
     * @param topic {string} - topic name
     * @param func {Fucntion} - event
     * @param oneMore {boolean} - allow more than one
     */
    public subcribe(topic: string, func: Function, oneMore?: boolean) {
        if (!topic) {
            throw Error('Invalid param: `topic` is required');
        }
        if (typeof func !== 'function') {
            throw Error('Invalid param: `func` is required');
        }
        if (!this.topics.has(topic)) {
            this.topics.set(topic, []);
        }
        let existFunctions = this.topics.get(topic);
        if (!existFunctions.includes(func)) {
            existFunctions.push(func);
        } else if (oneMore) {
            existFunctions.push(func);
        } else {
            console.warn(`Fuction is subcribed topic ${topic}. One more ?`);
        }
    }

    /**
     * Publishing will invoke all subcribed function event with the parameters
     * @param topic - topic
     * @param args - parameters for function event
     */
    public publish(topic: string, ...args: any[]) {
        if (!topic || !this.topics.has(topic)) {
            console.warn(`Topic ${topic} doesn't exist`);
            return;
        }
        this.topics.get(topic).forEach(t => t(args));
    }

    /**
     * Unsubcribe a fuction event on topic
     * @param topic {string} - topic name
     * @param func {Fucntion} - event
     */
    public unsubcribe(topic: string, func: Function) {
        if (!topic) {
            throw Error('Invalid param: `topic` is required');
        }
        if (typeof func !== 'function') {
            throw Error('Invalid param: `func` is required');
        }
        if (this.topics.has(topic)) {
            let filteredFunctions = this.topics.get(topic).filter(t => t !== func);
            this.topics.set(topic, filteredFunctions);
        }
    }
}