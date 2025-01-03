-- Create the database
CREATE DATABASE LeadGrid;
GO

USE LeadGrid;
GO

-- Create ERCOTMaster table with matching column names
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

-- Create indexes for better performance
CREATE INDEX IX_ErcotMaster_Address ON ErcotMaster (address);
CREATE INDEX IX_ErcotMaster_Zip ON ErcotMaster (zip);
GO

-- Insert some sample data with correct column names
INSERT INTO ErcotMaster (address, city, state, zip, ESIId, MeterType, PremiseType)
VALUES 
    ('123 Main St', 'Houston', 'TX', '77001', 'ESI123456', 'Smart', 'Commercial'),
    ('456 Oak Ave', 'Dallas', 'TX', '75001', 'ESI789012', 'Smart', 'Residential'),
    ('789 Pine Rd', 'Austin', 'TX', '73301', 'ESI345678', 'Standard', 'Commercial');
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