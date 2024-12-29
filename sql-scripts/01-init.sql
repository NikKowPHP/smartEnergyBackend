-- Create the database
CREATE DATABASE LeadGrid;
GO

USE LeadGrid;
GO

-- Create ERCOTMaster table
CREATE TABLE ERCOTMaster (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Address NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(2),
    ZipCode NVARCHAR(10),
    ESIId NVARCHAR(50),
    MeterType NVARCHAR(50),
    PremiseType NVARCHAR(50)
);
GO

-- Create CustomerData table
CREATE TABLE CustomerData (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Phone NVARCHAR(20),
    Email NVARCHAR(255),
    CompanyName NVARCHAR(255),
    AddressStreet NVARCHAR(255),
    AddressCity NVARCHAR(100),
    AddressState NVARCHAR(2),
    AddressZip NVARCHAR(10),
    ContractEndDate DATE,
    EnergyProvider NVARCHAR(100),
    MonthlyBill DECIMAL(10,2)
);
GO

-- Create indexes for better performance
CREATE INDEX IX_ERCOTMaster_Address ON ERCOTMaster (Address);
CREATE INDEX IX_ERCOTMaster_ZipCode ON ERCOTMaster (ZipCode);
GO

-- Insert some sample data
INSERT INTO ERCOTMaster (Address, City, State, ZipCode, ESIId, MeterType, PremiseType)
VALUES 
    ('123 Main St', 'Houston', 'TX', '77001', 'ESI123456', 'Smart', 'Commercial'),
    ('456 Oak Ave', 'Dallas', 'TX', '75001', 'ESI789012', 'Smart', 'Residential'),
    ('789 Pine Rd', 'Austin', 'TX', '73301', 'ESI345678', 'Standard', 'Commercial');
GO 

USE LeadGrid;
GO

-- Insert ERCOT Main Street search results
INSERT INTO ERCOTMaster (Address, City, State, ZipCode)
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