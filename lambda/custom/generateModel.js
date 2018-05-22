'use strict';

const fs = require('fs');
const path = require('path');
const templateDir = 'templates/';
const metadataFile = 'metadata.json';
const modelDir = '../../models/';
const modelFile = 'en-US.json';
const speechDir = './';
const speechFile = 'speech.json';

let values = [];
let speechMapping = {};
let existingModel = {};

function updateModel(values, speechMapping) {
    fs.readFile(path.resolve(modelDir, modelFile), 'utf-8', (err, content) => {
        if (err) {
            return console.error(err);
        }
        var contentObj = JSON.parse(content);
        // console.log('values in update' + values);
        // console.log('old values' + contentObj.interactionModel.languageModel.types[0].values);
        contentObj.interactionModel.languageModel.types[0].values = values;
        // console.log('new content obj' + JSON.stringify(contentObj));
        fs.writeFile(path.resolve(modelDir, modelFile), JSON.stringify(contentObj, null, 4), 'utf-8', (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('model has been updated!');
            fs.writeFile(path.resolve(speechDir, speechFile), JSON.stringify(speechMapping, null, 4), 'utf-8', (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('speech has been updated!');
            })
        })
    })
}

function validateMetadate(metadataObj) {
    let metadataKeys = Object.keys(metadataObj);
    if (!metadataKeys.includes('templateName') || !metadataKeys.includes('description')) {
        throw new Error('Expecting metadata to include property templateName and description');
    }
    let templateKeys = Object.keys(metadataObj.templateName)
    if (!templateKeys.includes('value') || !templateKeys.includes('synonyms')) {
        throw new Error('Expecting templateName to include property value and synonyms');
    }
    if (!Array.isArray(metadataObj.templateName.synonyms)) {
        throw new Error('Expecting synonyms to be an array');
    }
}

fs.readdir(templateDir, (err, subDirNames) => {
    if (err) {
        return console.error(err);
    }
    subDirNames.forEach((subDirName) => {
        fs.readdir(path.resolve(templateDir, subDirName), (err, fileNames) => {
            if (err) {
                return console.error(err);
            }
            fs.readFile(path.resolve(templateDir, subDirName, metadataFile), 'utf-8', (err, content) => {
                if (err) {
                    return console.error(err);
                }
                let contentObj = JSON.parse(content);
                try {
                    validateMetadate(contentObj);
                } catch (err) {
                    console.error(`Invalid metadata in dir ${subDirName} ` + err);
                    throw new Error(err);
                }
                let value = contentObj.templateName.value;
                let description = contentObj.description;
                // let obj = {};
                // obj[value] = description;
                // speechMapping.push(obj);
                speechMapping[value] = description;
                // console.log('value' + value);
                // console.log('description' + description);
                // console.log('speech' + speechMapping);
                values.push({'name' : contentObj.templateName});
                if (subDirNames.length === values.length) {
                    updateModel(values, speechMapping);
                }
            })
        })
    })
})
