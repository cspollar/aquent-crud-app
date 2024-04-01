INSERT INTO client (
    id,
    client_name,
    website_uri,
    phone_number,
    street_address,
    city,
    state,
    zip_code
) VALUES (
    1,
    'My Company',
    'https://my-company.example.com',
    '555-555-5555',
    '123 This St.',
    'Asheville',
    'NC',
    '28801'
), (
    2,
    'My Other Company',
    'https://my-other-company.example.org',
    '555-555-5555',
    '123 That St.',
    'Asheville',
    'NC',
    '28801'
);

INSERT INTO person (
    id,
    first_name,
    last_name,
    email_address,
    street_address,
    city,
    state,
    zip_code,
    client_id
) VALUES (
    1,
    'John',
    'Smith',
    'fake1@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801',
    1
), (
    2,
    'Jane',
    'Smith',
    'fake2@aquent.com',
    '123 Any St.',
    'Houston',
    'TX',
    '77005',
    1
), (
    3,
    'Pat',
    'Lopez',
    'fake3@aquent.com',
    '123 Any St.',
    'Houston',
    'TX',
    '77004',
    null
);
