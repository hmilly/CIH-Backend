/**
/api/rooms

GET - select and return all rooms from rooms collection;
POST - add a new room to rooms collection;
 */


/**
/api/rooms/available

GET - select and return all available rooms from rooms collection;
*/


/**
/api/rooms?equipment=

GET - select and return all rooms with required equipment from rooms collection;
*/


/**
/api/room/:id

GET - get room by id;
PUT - update availability status;
*/


/**
/api/room/equipment/:id

PUT - update equipment in the room;
 */





/**
/api/companies

GET - select and return all companies from companies collection;
POST - add a new company to companies collection;
 */


/**
/api/company/:id

GET - get company by id;
PUT - update company;
 */





/**
/api/bookings

GET - return all bookings;
 */


/**
/api/bookings?companyId=

GET - return all bookings for selected company;
DELETE - delete all bookings for selected company;
 */


/**
/api/booking/:id

GET - return booking by id;
DELETE - delete booking by id;
 */