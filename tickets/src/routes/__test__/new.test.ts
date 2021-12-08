it('has a route at POST:/api/tickets');

it('requires authentication, and returns 401 unauthorized when a the request doesn\'t have authorization token');

it('returns bad request when the ticket is invalid');

it('returns bad request when price is negative');

it('retuns 201 created for valid data and credentials');