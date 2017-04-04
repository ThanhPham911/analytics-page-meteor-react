import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
    // This code only runs on the server
    //projectsPublication
    Meteor.publish('projectsByUser', function (userId) {
        return Projects.find({ owner: userId });
    });

}
