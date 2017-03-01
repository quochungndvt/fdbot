'use strict';

// Weather Example
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart



const Wit = require('node-wit').Wit;
const log = require('node-wit').log;
const FB = require('./facebook.js');
const Config = require('./const.js');


const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Bot actions
const actions = {
  send({sessionId, context, entities}, {text}) {
    console.log(sessionId, context, entities,text,"____________");
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    // const recipientId = sessions[sessionId].fbid;
    // const recipientId = context._fbid_;
    // if (recipientId) {
    //   // Yay, we found our recipient!
    //   // Let's forward our bot response to her.
    //   // We return a promise to let our bot know when we're done sending
    //   return FB.fbMessage(recipientId, text)
    //   .then(() => null)
    //   .catch((err) => {
    //     console.error(
    //       'Oops! An error occurred while forwarding the response to',
    //       recipientId,
    //       ':',
    //       err.stack || err
    //     );
    //   });
    // } else {
    //   console.error('Oops! Couldn\'t find user for session:', sessionId);
    //   // Giving the wheel back to our bot
    //   return Promise.resolve()
    // }
    
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
  ['fetch-weather']({sessionId, context, text, entities}) {
    // Here should go the api call, e.g.:
    // context.forecast = apiCall(context.loc)
    context.forecast = 'sunny';
    cb(context);
  },
  ['findTheater']({sessionId, context, text, entities}) {
    // Here should go the api call, e.g.:
    // context.forecast = apiCall(context.loc)
    context.theater = 'Nguyễn Du';
    cb(context);
  },
  ['compute-result']({sessionId, context, text, entities}) {
      return new Promise(function(resolve, reject) {
        const movie_title = firstEntityValue(context.entities, 'movie');
        if (movie_title) {
          context.movie = movie_title;
        }
        //call the API here
        return resolve(context);
    })
  }
};

const getWit = () => {
  return new Wit({accessToken: Config.WIT_TOKEN, actions, logger: new log.Logger(log.INFO)});
}

exports.getWit = getWit;

// bot testing mode
// http://stackoverflow.com/questions/6398196
if (require.main === module) {
  console.log("Bot testing mode.");
  const client = getWit();
  client.interactive();
}