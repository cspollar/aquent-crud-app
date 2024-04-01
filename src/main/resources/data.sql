INSERT INTO client (
    client_name,
    website_uri,
    phone_number,
    street_address,
    city,
    state,
    zip_code
) VALUES (
    'My Company',
    'https://my-company.example.com',
    '555-555-5555',
    '123 This St.',
    'Asheville',
    'NC',
    '28801'
), (
    'My Other Company',
    'https://my-other-company.example.org',
    '555-555-5555',
    '123 That St.',
    'Asheville',
    'NC',
    '28801'
);

INSERT INTO person (
    first_name,
    last_name,
    email_address,
    street_address,
    city,
    state,
    zip_code,
    client_id
) VALUES (
    'John',
    'Smith',
    'fake1@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801',
    1
), (
    'Jane',
    'Smith',
    'fake2@aquent.com',
    '123 Any St.',
    'Houston',
    'TX',
    '77005',
    1
), (
    'Pat',
    'Lopez',
    'fake3@aquent.com',
    '123 Any St.',
    'Houston',
    'TX',
    '77004',
    null
);
