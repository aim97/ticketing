it('has a route at PATCH:/api/tickets');

it('returnes unauthorized when user is not logged in');

it('returns 400 bad request when the update data is invalid');

it('returned 404 when ticket is not found');

it('rejects the update unless from owner');

it('allows owner to update the ticket with valid data');