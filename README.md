# Voters Guide
votersguide.co - A website that focuses on making voters' choices accessible by design.

## Milestones
**v0:** Users can easily reference PROS and CONS of each prop _for SF only_
**v1:** Users can easily save their choices for later (and decide whether their choices are OK to display publicly)

**Nov 6th: ELECTIONS HAPPEN**
--> We get useful feedback on the design of our app (which is the pain point we set out to solve in the first place)

**v2:** Build our own API using other API's, that other devs can consume
   - use API to determine city and state from ZIP
   - returns any information we have available using various APIs (for ex, we can use Google Civic API to get candidates)

--> with v2, we solve the problem we've been encountering as product developers: nobody has made an API with all the data we want

Examples:
https://votersedge.org/ca
https://developers.google.com/civic-information/docs/v2/elections/voterInfoQuery
https://ballotpedia.org/California_2018_ballot_propositions

## To-do list

### v0
- [x] Wireframes
- [x] Conceptualize DB Model
- [x] Set up node app
- [ ] Basic front-end
- [ ] Set up a DB with SF Voting Options
- [ ] Set up authentication

## Model

### Proposition:
- Summary
- ProsAndCons
- ArrayOfYesVoters
- ArrayOfNoVoters
- ReadMoreUrl

### Candidate:
- Position
- NumberOfChoicesAllowed
- TopPriorities
- Name
- PreviousTitles
- ProfilePictureURL
- ReadMoreUrl
- ArrayOfSupporters

### User:
- First Name
- Last Name
- Email
- Password
- YesVotes
- NoVotes
- SupportedCandidates
- ProfilePrivacy
