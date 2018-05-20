const Alexa = require('ask-sdk-core');

/******** UI Prompts ********/
const WELCOME_MESSAGE = 'Welcome to APML cook book skill. Which template would you like me to display?';
const HELP_MESSAGE = 'Tell me the template name you would like to diaplay, I will help you render it on device. Which template would you like me to display?';
const RENDER_PROMPT = `Okay, here is your template. What else would you like me to display?`;
const RENDER_REPROMPT = `Tell me the template name you would like to diaplay, or, say 'stop' to quit the skill. What else would you like me to display?`;
const STOP_MESSAGE = 'Good bye! Thanks for using cook book skill';
const FALLBACK_MESSAGE = 'I didn\'t get that. Which template would you like me to display?';


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(WELCOME_MESSAGE)
            .reprompt(WELCOME_MESSAGE)
            .getResponse();
    },
};

const DisplayIntentHandler = {
  canHandle(handlerInput) {
    console.log(JSON.stringify(handlerInput.requestEnvelope.request));
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DisplayIntent';
  },
  handle(handlerInput) {
    console.log(JSON.stringify(handlerInput.requestEnvelope.request));
    // const template = handlerInput.requestEnvelope.request.intent.slots.template.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let response = handlerInput.responseBuilder
        .speak(RENDER_PROMPT)
        .reprompt(RENDER_REPROMPT)
        .getResponse();

    // TODO: Add template json into response directives
    // let apmlDirective = this.getAPMLDirective(template);

    // response.directives = [
    //     {
    //         type: 'Display.RenderTemplate',
    //         template: {
    //             type: 'APML',
    //             version: '0.2',
    //             dataSources: {
    //                 'bodyTemplate1Data': {
    //                     'type': 'object',
    //                     'objectId': 'bt1Sample',
    //                     'backgroundImage': {
    //                         'contentDescription': null,
    //                         'smallSourceUrl': null,
    //                         'largeSourceUrl': null,
    //                         'sources': [
    //                             {
    //                                 'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
    //                                 'size': 'small',
    //                                 'widthPixels': 0,
    //                                 'heightPixels': 0
    //                             },
    //                             {
    //                                 'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
    //                                 'size': 'large',
    //                                 'widthPixels': 0,
    //                                 'heightPixels': 0
    //                             }
    //                         ]
    //                     },
    //                     'title': 'My Title Text',
    //                     'textContent': {
    //                         'primaryText': {
    //                             'type': 'PlainText',
    //                             'text': 'This is a bit of text in the normal font that might wrap once or twice.'
    //                         }
    //                     },
    //                     'logoUrl': 'images/APP_ICON.png'
    //                 }
    //             },
    //             document: {
    //                 'type': 'APML',
    //                 'version': '0.2',
    //                 'theme': 'auto',
    //                 'layouts': {
    //                     'OneLineHeader': {
    //                         'parameters': [
    //                             'backButton',
    //                             'title',
    //                             'logo'
    //                         ],
    //                         'item': [
    //                             {
    //                                 'when': '${screen.shape == \'round\'}',
    //                                 'type': 'Container',
    //                                 'direction': 'row',
    //                                 'width': '100%',
    //                                 'alignItems': 'center',
    //                                 'justifyContent': 'center',
    //                                 'items': {
    //                                     'type': 'Image',
    //                                     'source': '${logo}',
    //                                     'height': 48,
    //                                     'width': 48,
    //                                     'scale': 'best-fit'
    //                                 }
    //                             },
    //                             {
    //                                 'type': 'Container',
    //                                 'direction': 'row',
    //                                 'width': '100%',
    //                                 'alignItems': 'center',
    //                                 'justifyContent': 'spaceBetween',
    //                                 'paddingRight': 72,
    //                                 'items': [
    //                                     {
    //                                         'type': 'Text',
    //                                         'text': '${title}',
    //                                         'style': 'textStyleSecondary',
    //                                         'paddingLeft': 72
    //                                     },
    //                                     {
    //                                         'type': 'Image',
    //                                         'source': '${logo}',
    //                                         'height': 60,
    //                                         'width': 60,
    //                                         'scale': 'best-fit'
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     },
    //                     'MultiLineHeader': {
    //                         'parameters': [
    //                             'backButton',
    //                             'title',
    //                             'logo'
    //                         ],
    //                         'item': [
    //                             {
    //                                 'when': '${screen.shape == \'round\'}',
    //                                 'type': 'Container',
    //                                 'direction': 'column',
    //                                 'width': '100%',
    //                                 'alignItems': 'center',
    //                                 'justifyContent': 'center',
    //                                 'items': [
    //                                     {
    //                                         'type': 'Image',
    //                                         'source': '${logo}',
    //                                         'height': 48,
    //                                         'width': 48,
    //                                         'scale': 'best-fit'
    //                                     },
    //                                     {
    //                                         'type': 'Text',
    //                                         'text': '${title}',
    //                                         'style': 'textStyleSecondary',
    //                                         'align': 'center',
    //                                         'maxLines': 2
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 'type': 'OneLineHeader',
    //                                 'title': '${title}',
    //                                 'logo': '${logo}'
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 'mainTemplate': {
    //                     'description': '********* Full-screen background image **********',
    //                     'parameters': [
    //                         'payload'
    //                     ],
    //                     'items': [
    //                         {
    //                             'when': '${screen.shape == \'round\'}',
    //                             'type': 'Container',
    //                             'direction': 'column',
    //                             'paddingLeft': 50,
    //                             'paddingRight': 30,
    //                             'width': '100%',
    //                             'height': '100%',
    //                             'paddingTop': 10,
    //                             'items': [
    //                                 {
    //                                     'type': 'Image',
    //                                     'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
    //                                     'position': 'absolute',
    //                                     'width': '100%',
    //                                     'height': '100%',
    //                                     'scale': 'best-fill'
    //                                 },
    //                                 {
    //                                     'type': 'MultiLineHeader',
    //                                     'title': '${payload.bodyTemplate1Data.title}',
    //                                     'logo': '${payload.logoUrl}'
    //                                 },
    //                                 {
    //                                     'type': 'Text',
    //                                     'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
    //                                     'size': 'textSizeBody',
    //                                     'spacing': 'spacingSmall',
    //                                     'style': 'textStyleBody1'
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             'type': 'Container',
    //                             'width': '100%',
    //                             'height': '100%',
    //                             'alignItems': 'center',
    //                             'items': [
    //                                 {
    //                                     'type': 'Image',
    //                                     'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
    //                                     'position': 'absolute',
    //                                     'width': '100%',
    //                                     'height': '100%',
    //                                     'scale': 'best-fill'
    //                                 },
    //                                 {
    //                                     'type': 'Container',
    //                                     'height': '100%',
    //                                     'width': '100%',
    //                                     'paddingLeft': 'marginLeft',
    //                                     'paddingRight': 'marginRight',
    //                                     'paddingTop': 'marginTop',
    //                                     'paddingBottom': 'marginBottom',
    //                                     'items': [
    //                                         {
    //                                             'type': 'Container',
    //                                             'height': 100,
    //                                             'width': '100%',
    //                                             'direction': 'row',
    //                                             'alignItems': 'center',
    //                                             'justifyContent': 'spaceBetween',
    //                                             'items': [
    //                                                 {
    //                                                     'type': 'Text',
    //                                                     'text': '${payload.bodyTemplate1Data.title}',
    //                                                     'style': 'textStylePrimary1'
    //                                                 },
    //                                                 {
    //                                                     'type': 'Image',
    //                                                     'source': '${payload.bodyTemplate1Data.logoUrl}',
    //                                                     'height': 60,
    //                                                     'width': 60,
    //                                                     'scale': 'best-fit'
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             'type': 'Text',
    //                                             'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
    //                                             'size': 'textSizeBody',
    //                                             'spacing': 'spacingSmall',
    //                                             'style': 'textStyleBody1'
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     }
    // ];

    response.directives = [
        {
            type: 'Display.RenderTemplate',
            template: {
                type: 'APML',
                version: '0.2',
                dataSources: {
                    'bodyTemplate1Data': {
                        'type': 'object',
                        'objectId': 'bt1Sample',
                        'backgroundImage': {
                            'contentDescription': null,
                            'smallSourceUrl': null,
                            'largeSourceUrl': null,
                            'sources': [
                                {
                                    'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
                                    'size': 'small',
                                    'widthPixels': 0,
                                    'heightPixels': 0
                                },
                                {
                                    'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
                                    'size': 'large',
                                    'widthPixels': 0,
                                    'heightPixels': 0
                                }
                            ]
                        },
                        'title': 'My Title Text',
                        'textContent': {
                            'primaryText': {
                                'type': 'PlainText',
                                'text': 'This is a bit of text in the normal font that might wrap once or twice.'
                            }
                        },
                        'logoUrl': 'images/APP_ICON.png'
                    }
                },
                document: {
                    'type': 'APML',
                    'version': '0.2',
                    'theme': 'auto',
                    'layouts': {
                        'OneLineHeader': {
                            'parameters': [
                                'backButton',
                                'title',
                                'logo'
                            ],
                            'item': [
                                {
                                    'when': '${screen.shape == \'round\'}',
                                    'type': 'Container',
                                    'direction': 'row',
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'justifyContent': 'center',
                                    'items': {
                                        'type': 'Image',
                                        'source': '${logo}',
                                        'height': 48,
                                        'width': 48,
                                        'scale': 'best-fit'
                                    }
                                },
                                {
                                    'type': 'Container',
                                    'direction': 'row',
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'justifyContent': 'spaceBetween',
                                    'paddingRight': 72,
                                    'items': [
                                        {
                                            'type': 'Text',
                                            'text': '${title}',
                                            'style': 'textStyleSecondary',
                                            'paddingLeft': 72
                                        },
                                        {
                                            'type': 'Image',
                                            'source': '${logo}',
                                            'height': 60,
                                            'width': 60,
                                            'scale': 'best-fit'
                                        }
                                    ]
                                }
                            ]
                        },
                        'MultiLineHeader': {
                            'parameters': [
                                'backButton',
                                'title',
                                'logo'
                            ],
                            'item': [
                                {
                                    'when': '${screen.shape == \'round\'}',
                                    'type': 'Container',
                                    'direction': 'column',
                                    'width': '100%',
                                    'alignItems': 'center',
                                    'justifyContent': 'center',
                                    'items': [
                                        {
                                            'type': 'Image',
                                            'source': '${logo}',
                                            'height': 48,
                                            'width': 48,
                                            'scale': 'best-fit'
                                        },
                                        {
                                            'type': 'Text',
                                            'text': '${title}',
                                            'style': 'textStyleSecondary',
                                            'align': 'center',
                                            'maxLines': 2
                                        }
                                    ]
                                },
                                {
                                    'type': 'OneLineHeader',
                                    'title': '${title}',
                                    'logo': '${logo}'
                                }
                            ]
                        }
                    },
                    'mainTemplate': {
                        'description': '********* Full-screen background image **********',
                        'parameters': [
                            'payload'
                        ],
                        'items': [
                            {
                                'when': '${screen.shape == \'round\'}',
                                'type': 'Container',
                                'direction': 'column',
                                'paddingLeft': 50,
                                'paddingRight': 30,
                                'width': '100%',
                                'height': '100%',
                                'paddingTop': 10,
                                'items': [
                                    {
                                        'type': 'Image',
                                        'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
                                        'position': 'absolute',
                                        'width': '100%',
                                        'height': '100%',
                                        'scale': 'best-fill'
                                    },
                                    {
                                        'type': 'MultiLineHeader',
                                        'title': '${payload.bodyTemplate1Data.title}',
                                        'logo': '${payload.logoUrl}'
                                    },
                                    {
                                        'type': 'Text',
                                        'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
                                        'size': 'textSizeBody',
                                        'spacing': 'spacingSmall',
                                        'style': 'textStyleBody1'
                                    }
                                ]
                            },
                            {
                                'type': 'Container',
                                'width': '100%',
                                'height': '100%',
                                'alignItems': 'center',
                                'items': [
                                    {
                                        'type': 'Image',
                                        'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
                                        'position': 'absolute',
                                        'width': '100%',
                                        'height': '100%',
                                        'scale': 'best-fill'
                                    },
                                    {
                                        'type': 'Container',
                                        'height': '100%',
                                        'width': '100%',
                                        'paddingLeft': 'marginLeft',
                                        'paddingRight': 'marginRight',
                                        'paddingTop': 'marginTop',
                                        'paddingBottom': 'marginBottom',
                                        'items': [
                                            {
                                                'type': 'Container',
                                                'height': 100,
                                                'width': '100%',
                                                'direction': 'row',
                                                'alignItems': 'center',
                                                'justifyContent': 'spaceBetween',
                                                'items': [
                                                    {
                                                        'type': 'Text',
                                                        'text': '${payload.bodyTemplate1Data.title}',
                                                        'style': 'textStylePrimary1'
                                                    },
                                                    {
                                                        'type': 'Image',
                                                        'source': '${payload.bodyTemplate1Data.logoUrl}',
                                                        'height': 60,
                                                        'width': 60,
                                                        'scale': 'best-fit'
                                                    }
                                                ]
                                            },
                                            {
                                                'type': 'Text',
                                                'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
                                                'size': 'textSizeBody',
                                                'spacing': 'spacingSmall',
                                                'style': 'textStyleBody1'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    ];

    console.log(JSON.stringify(response));
    return response;
  },
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name == 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            .reprompt(FALLBACK_MESSAGE)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(HELP_MESSAGE)
            .withSimpleCard('Help', HELP_MESSAGE)
            .getResponse();
   },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(STOP_MESSAGE)
            .getResponse();

    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        let response =  handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            .reprompt(FALLBACK_MESSAGE)
            .getResponse();

        response.directives = [
            {
                type: 'Display.RenderTemplate',
                template: {
                    type: 'APML',
                    version: '0.2',
                    dataSources: {
                        'bodyTemplate1Data': {
                            'type': 'object',
                            'objectId': 'bt1Sample',
                            'backgroundImage': {
                                'contentDescription': null,
                                'smallSourceUrl': null,
                                'largeSourceUrl': null,
                                'sources': [
                                    {
                                        'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
                                        'size': 'small',
                                        'widthPixels': 0,
                                        'heightPixels': 0
                                    },
                                    {
                                        'url': 'https://s3.amazonaws.com/allrecipes-stock-images/00_Bg_AllRecipes.png',
                                        'size': 'large',
                                        'widthPixels': 0,
                                        'heightPixels': 0
                                    }
                                ]
                            },
                            'title': 'My Title Text',
                            'textContent': {
                                'primaryText': {
                                    'type': 'PlainText',
                                    'text': 'This is a bit of text in the normal font that might wrap once or twice.'
                                }
                            },
                            'logoUrl': 'images/APP_ICON.png'
                        }
                    },
                    document: {
                        'type': 'APML',
                        'version': '0.2',
                        'theme': 'auto',
                        'layouts': {
                            'OneLineHeader': {
                                'parameters': [
                                    'backButton',
                                    'title',
                                    'logo'
                                ],
                                'item': [
                                    {
                                        'when': '${screen.shape == \'round\'}',
                                        'type': 'Container',
                                        'direction': 'row',
                                        'width': '100%',
                                        'alignItems': 'center',
                                        'justifyContent': 'center',
                                        'items': {
                                            'type': 'Image',
                                            'source': '${logo}',
                                            'height': 48,
                                            'width': 48,
                                            'scale': 'best-fit'
                                        }
                                    },
                                    {
                                        'type': 'Container',
                                        'direction': 'row',
                                        'width': '100%',
                                        'alignItems': 'center',
                                        'justifyContent': 'spaceBetween',
                                        'paddingRight': 72,
                                        'items': [
                                            {
                                                'type': 'Text',
                                                'text': '${title}',
                                                'style': 'textStyleSecondary',
                                                'paddingLeft': 72
                                            },
                                            {
                                                'type': 'Image',
                                                'source': '${logo}',
                                                'height': 60,
                                                'width': 60,
                                                'scale': 'best-fit'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'MultiLineHeader': {
                                'parameters': [
                                    'backButton',
                                    'title',
                                    'logo'
                                ],
                                'item': [
                                    {
                                        'when': '${screen.shape == \'round\'}',
                                        'type': 'Container',
                                        'direction': 'column',
                                        'width': '100%',
                                        'alignItems': 'center',
                                        'justifyContent': 'center',
                                        'items': [
                                            {
                                                'type': 'Image',
                                                'source': '${logo}',
                                                'height': 48,
                                                'width': 48,
                                                'scale': 'best-fit'
                                            },
                                            {
                                                'type': 'Text',
                                                'text': '${title}',
                                                'style': 'textStyleSecondary',
                                                'align': 'center',
                                                'maxLines': 2
                                            }
                                        ]
                                    },
                                    {
                                        'type': 'OneLineHeader',
                                        'title': '${title}',
                                        'logo': '${logo}'
                                    }
                                ]
                            }
                        },
                        'mainTemplate': {
                            'description': '********* Full-screen background image **********',
                            'parameters': [
                                'payload'
                            ],
                            'items': [
                                {
                                    'when': '${screen.shape == \'round\'}',
                                    'type': 'Container',
                                    'direction': 'column',
                                    'paddingLeft': 50,
                                    'paddingRight': 30,
                                    'width': '100%',
                                    'height': '100%',
                                    'paddingTop': 10,
                                    'items': [
                                        {
                                            'type': 'Image',
                                            'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
                                            'position': 'absolute',
                                            'width': '100%',
                                            'height': '100%',
                                            'scale': 'best-fill'
                                        },
                                        {
                                            'type': 'MultiLineHeader',
                                            'title': '${payload.bodyTemplate1Data.title}',
                                            'logo': '${payload.logoUrl}'
                                        },
                                        {
                                            'type': 'Text',
                                            'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
                                            'size': 'textSizeBody',
                                            'spacing': 'spacingSmall',
                                            'style': 'textStyleBody1'
                                        }
                                    ]
                                },
                                {
                                    'type': 'Container',
                                    'width': '100%',
                                    'height': '100%',
                                    'alignItems': 'center',
                                    'items': [
                                        {
                                            'type': 'Image',
                                            'source': '${payload.bodyTemplate1Data.backgroundImage.sources[0].url}',
                                            'position': 'absolute',
                                            'width': '100%',
                                            'height': '100%',
                                            'scale': 'best-fill'
                                        },
                                        {
                                            'type': 'Container',
                                            'height': '100%',
                                            'width': '100%',
                                            'paddingLeft': 'marginLeft',
                                            'paddingRight': 'marginRight',
                                            'paddingTop': 'marginTop',
                                            'paddingBottom': 'marginBottom',
                                            'items': [
                                                {
                                                    'type': 'Container',
                                                    'height': 100,
                                                    'width': '100%',
                                                    'direction': 'row',
                                                    'alignItems': 'center',
                                                    'justifyContent': 'spaceBetween',
                                                    'items': [
                                                        {
                                                            'type': 'Text',
                                                            'text': '${payload.bodyTemplate1Data.title}',
                                                            'style': 'textStylePrimary1'
                                                        },
                                                        {
                                                            'type': 'Image',
                                                            'source': '${payload.bodyTemplate1Data.logoUrl}',
                                                            'height': 60,
                                                            'width': 60,
                                                            'scale': 'best-fit'
                                                        }
                                                    ]
                                                },
                                                {
                                                    'type': 'Text',
                                                    'text': '${payload.bodyTemplate1Data.textContent.primaryText.text}',
                                                    'size': 'textSizeBody',
                                                    'spacing': 'spacingSmall',
                                                    'style': 'textStyleBody1'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ];

    },
};

/******** HELPER FUNCTIONS ********/

// function getAPMLDirective(template) {
//   return ;
// }

/******** LAMBDA SETUP ********/

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        DisplayIntentHandler,
        FallbackIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
