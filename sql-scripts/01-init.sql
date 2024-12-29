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