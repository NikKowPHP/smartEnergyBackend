-- Create the database
CREATE DATABASE LeadGrid;
GO

USE LeadGrid;
GO

-- Create ERCOTMaster table
CREATE TABLE ErcotMaster (
    id INT IDENTITY(1,1) PRIMARY KEY,
    address NVARCHAR(255) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    state NVARCHAR(2) NOT NULL,
    zip NVARCHAR(10) NOT NULL, 
    ESIId NVARCHAR(50) NULL,
    MeterType NVARCHAR(50) NULL,
    PremiseType NVARCHAR(50) NULL
);
GO

-- Create CustomerData table
CREATE TABLE CustomerData (
    id INT IDENTITY(1,1) PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(100) NOT NULL,
    address_state VARCHAR(2) NOT NULL,
    address_zip VARCHAR(10) NOT NULL,
    contract_end_date DATE NOT NULL,
    energy_provider VARCHAR(100) NOT NULL,
    monthly_bill DECIMAL(10,2) NOT NULL
);
GO

-- Create indexes for better performance
CREATE INDEX IX_ErcotMaster_Address ON ErcotMaster (address);
CREATE INDEX IX_ErcotMaster_Zip ON ErcotMaster (zip);
CREATE INDEX IX_CustomerData_Email ON CustomerData (email);
CREATE INDEX IX_CustomerData_Phone ON CustomerData (phone);
CREATE INDEX IX_CustomerData_Address ON CustomerData (address_street, address_city, address_state, address_zip);
GO

-- Insert sample data for ErcotMaster
INSERT INTO ErcotMaster (address, city, state, zip, ESIId, MeterType, PremiseType)
VALUES 
    ('123 Main St', 'Houston', 'TX', '77001', 'ESI123456', 'Smart', 'Commercial'),
    ('456 Oak Ave', 'Dallas', 'TX', '75001', 'ESI789012', 'Smart', 'Residential'),
    ('789 Pine Rd', 'Austin', 'TX', '73301', 'ESI345678', 'Standard', 'Commercial');
GO 

-- Insert sample data for CustomerData
INSERT INTO CustomerData (
    phone, 
    email, 
    company_name, 
    address_street, 
    address_city, 
    address_state, 
    address_zip, 
    contract_end_date, 
    energy_provider, 
    monthly_bill
)
VALUES 
    (
        '(713) 555-0123',
        'info@techcorp.com',
        'Tech Corporation',
        '123 Main St',
        'Houston',
        'TX',
        '77001',
        '2025-12-31',
        'Texas Energy Co',
        2500.75
    ),
    (
        '(214) 555-0456',
        'contact@dataserv.com',
        'Data Services LLC',
        '456 Oak Ave',
        'Dallas',
        'TX',
        '75001',
        '2025-06-30',
        'Green Power Inc',
        1750.50
    ),
    (
        '(512) 555-0789',
        'office@innovate.com',
        'Innovate Solutions',
        '789 Pine Rd',
        'Austin',
        'TX',
        '73301',
        '2025-09-15',
        'Renewable Energy Corp',
        3200.25
    );
GO

-- Insert ERCOT Main Street search results
INSERT INTO ErcotMaster (address, city, state, zip)
VALUES 
    ('5052 SAN JUANITA RD TIERRA LINDA MAIN STREET', 'RIO GRANDE CITY', 'TX', '78582'),
    ('466 SANTIAGO ST MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('488 BALLI CIR MAIN STREET SUBDIVISION', 'LA FERIA', 'TX', '78559'),
    ('3803 N MAIN ST LOT 11 MAIN STREET PROPERTIES', 'VICTORIA', 'TX', '77901'),
    ('503 BALLI CIR MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('483 SANTIAGO ST MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('505 BALLI CIR MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('532 BALLI CIR MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('473 SANTIAGO ST MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559'),
    ('469 SANTIAGO ST MAIN STREET ESTATES', 'LA FERIA', 'TX', '78559');
GO