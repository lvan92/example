// @TODO: Refactor for more DRY code
module.exports = {
  Category: require('./category'),
  Event: require('./event'),
  Users: require('./user'),
  Event_Content: require('./event_content_multi_language'),
  Tribe: require('./tribe'),
  Tribe_Content: require('./tribe_content_multi_language'),
  Event_Sport_Group_Content: require('./event_sport_group_content_multi_language'),
  Event_Country: require('./event_country'),
  Country: require('./country'),  
  Event_Sport_Group: require('./event_sport_group'),
  Language: require('./language'),
  User_Tribe: require('./user_tribe'),
  Impact: require('./Impact'),
  Impact_Content: require('./impact_content_multi_language'),
  Session: require('./session'),
  Session_Content: require('./session_content_multi_language'),
  Session_Keyword: require('./session_keyword'),
  Session_Keyword_Content: require('./session_keyword_content_multi_language'),
  Sponsor: require('./sponsor'),
  Sponsor_content: require('./sponsor_content_multi_language'),
  Video: require('./video'),
  Event_Impact: require('./event_impact'),
  Sound: require('./sound'),
  Session_Impact: require('./session_impact'),
};