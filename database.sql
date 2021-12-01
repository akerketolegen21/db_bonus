-- CREATE DATABASE diseases;
CREATE TABLE DiseaseType(
    "id" SERIAL PRIMARY KEY, 
    "description" varchar(140));
CREATE TABLE Country(
    "cname" varchar(50) PRIMARY KEY NOT NULL, 
    "population" bigint);
CREATE TABLE Disease(
    "disease code" varchar(50) PRIMARY KEY NOT NULL, 
    "pathogen" varchar(20), 
    "description" varchar(140), 
    "id" int,
    FOREIGN KEY("id") REFERENCES DiseaseType("id") ON DELETE CASCADE); 
CREATE TABLE Discover(
    "id" SERIAL PRIMARY KEY, 
    "cname" varchar(50), 
    "disease code" varchar(50), 
    "first enc date" date,
    FOREIGN KEY("cname") REFERENCES Country("cname") ON DELETE CASCADE,
    FOREIGN KEY("disease code") REFERENCES Disease("disease code") ON DELETE CASCADE); 
CREATE TABLE Users(
    "email" varchar(60) PRIMARY KEY NOT NULL, 
    "name" varchar(30), 
    "surname" varchar(40), 
    "salary" int, 
    "phone" varchar(20), 
    "cname" varchar(50),
    FOREIGN KEY("cname") REFERENCES Country("cname") ON DELETE CASCADE); 
CREATE TABLE PublicServant(
    "email" varchar(60) UNIQUE, 
    "department" varchar(50),
    FOREIGN KEY("email") REFERENCES Users("email") ON DELETE CASCADE); 
CREATE TABLE Doctor(
    "email" varchar(60) UNIQUE, 
    "degree" varchar(20),
    FOREIGN KEY("email") REFERENCES Users("email") ON DELETE CASCADE); 
CREATE TABLE Specialize(
    "specialize_in" SERIAL PRIMARY KEY,
    "id" int REFERENCES DiseaseType("id"),
    "email" varchar(60), 
    FOREIGN KEY("email") REFERENCES Doctor("email") ON DELETE CASCADE); 
CREATE TABLE Record(
    "recordID" SERIAL PRIMARY KEY,
    "email" varchar(60), 
    "cname" varchar(50), 
    "disease code" varchar(50), 
    "total deaths" int, 
    "total patients" int,
    FOREIGN KEY("email") REFERENCES PublicServant("email") ON DELETE CASCADE,
    FOREIGN KEY("cname") REFERENCES Country("cname") ON DELETE CASCADE,
    FOREIGN KEY("disease code") REFERENCES Disease("disease code") ON DELETE CASCADE); 

INSERT INTO DiseaseType(description)
VALUES ('HEREDITARY'), ('infectious diseases'), ('DEFICIENCY'), ('PHYSIOLOGICAL'), ('ACQUIRED'), 
        ('CHRONIC'), ('IDIOPATHIC'), ('INCURABLE'), ('PLACEBO'), ('ACUTE'), ('bacteria'), ('virology');


INSERT INTO Country
VALUES ('China', '1439323776'), ('India', '1380004385'), ('United States', '331002651'), ('Brazil', '212559417'),
        ('Russia', '145934462'), ('Japan', '126476461'), ('Germany', '83783942'), ('France', '65273511'),
        ('Italy', '60461826'), ('South Korea', '51269185');

insert into Disease
values ('covid-19', 'delta', 'disease 1a', '1'), ('sars', 'X2M', 'disease 1b', '1'), ('cold', 'virology', 'disease 2a', '2'), ('influenza', 'W2S', 'disease 3a', '3'), ('e.coli', 'L2D', 'disease 4b', '4'), 
        ('herpes', 'K2C', 'disease 5c', '5'), ('syphilis', 'Z2L', 'disease 6b', '6'), ('norovirus', 'G2S', 'disease 7a', '7'), ('salmonella', 'H2S', 'disease 8k', '8'), ('pneumonia', 'T2N', 'disease 9j', '9'),
        ('hepatitis-c', 'bacteria', 'disease 11a', '11'), ('hiv', 'bacteria', 'disease 11j', '11');

insert into Discover("cname","disease code", "first enc date")
values ('China', 'covid-19', '2019-10-02'), ('Russia', 'sars', '1967-04-24'), ('Brazil', 'influenza', '1865-07-13'), ('France', 'cold', '1001-10-10'), ('France', 'pneumonia', '1989-11-10'),
        ('Japan', 'herpes', '1845-02-19'), ('India', 'e.coli', '1966-06-28'), ('Germany', 'syphilis', '1984-11-14'), ('India', 'salmonella', '2004-09-26'), ('South Korea', 'norovirus', '2006-07-24'),
        ('Germany', 'hepatitis-c', '1895-01-19'), ('Italy', 'hiv', '1995-10-14');

insert into Users
values ('assiya.yeraly@nu.edu.kz', 'Assiya', 'Yeraly', '300000', '87073452356', 'Brazil'),
    ('dana.oskenbay@nu.edu.kz', 'Dana', 'Oskenbay', '400000', '87003453356', 'Germany'),
('yeligay.segizbay@nu.edu.kz', 'Yeligay', 'Segizbay', '120000', '87000957353', 'India'), 
('ayazhan.abdirakhym@nu.edu.kz', 'Ayazhan', 'Abdirakhym', '190000', '87023405373', 'Japan'),
('inabbat.torebekkyzy@nu.edu.kz', 'Inabbat', 'Torebekkyzy', '320000', '87003443388', 'South Korea'),
('aigerim.bauyrzhanova@nu.edu.kz', 'Aigerim', 'Bauyrzhanova', '450000', '87063853156', 'France'), 
('batizhamal.rauiya@nu.edu.kz', 'Batizhamal', 'Rauiya','200000', '87083450316', 'Italy'),
('zhibek.rakhymbekkyzy@nu.edu.kz', 'Zhibek', 'Rakhymbekkyzy', '160000', '87013503256', 'China'),
('aruzhan.nurmanova@nu.edu.kz', 'Aruzhan', 'Nurmanova', '330000', '87093607354', 'Russia'),
('ulpan.beken@nu.edu.kz', 'Ulpan', 'Beken', '290000', '87003439600', 'United States'),
('anel.kairatova@nu.edu.kz', 'Anel', 'Kairatova', '300000', '87073452359', 'Brazil'),
('akmaral.amanturdieva@nu.edu.kz', 'Akmaral', 'Amanturdieva', '400000', '87003453352', 'Germany'),
('alfiya.lugma@nu.edu.kz', 'Alfiya', 'Lugma', '120000', '87000957358', 'India'), 
('anel.samadulla@nu.edu.kz', 'Anel', 'Samadulla', '190000', '87023405375', 'Japan'),
('ayaulym.raikhankyzy@nu.edu.kz', 'Ayaulym', 'Raikhankyzy', '320000', '87003443381', 'South Korea'),
('zhanel.auyezova@nu.edu.kz', 'Zhanel', 'Auyezova', '450000', '87063853150', 'France'), 
('mokhira.atashikova@nu.edu.kz', 'Mokhira', 'Atashikova','200000', '87083450336', 'Italy'),
('feruza.tursunmetova@nu.edu.kz', 'Feruza', 'Tursunmetova', '160000', '87013505256', 'China'),
('zhuldyz.namazbayeva@nu.edu.kz', 'Zhuldyz', 'Namazbayeva', '330000', '87093607856', 'Russia'),
('assem.sansyzbay@nu.edu.kz', 'Assem', 'Sansyzbay', '290000', '87003639606', 'United States'),
('kamila.salimzhanova@nu.edu.kz', 'Kamila', 'Salimzhanova', '390000', '87013439606', 'United States');

insert into Doctor 
values ('assiya.yeraly@nu.edu.kz', 'Dentistry'),
    ('dana.oskenbay@nu.edu.kz', 'Podiatric'),
('yeligay.segizbay@nu.edu.kz', 'Chiropractic'), 
('ayazhan.abdirakhym@nu.edu.kz', 'Chiropractic'),
('inabbat.torebekkyzy@nu.edu.kz', 'Naturopathic'),
('aigerim.bauyrzhanova@nu.edu.kz', 'Physical Therapy'), 
('batizhamal.rauiya@nu.edu.kz', 'Chiropractic'),
('zhibek.rakhymbekkyzy@nu.edu.kz', 'Physical Therapy'),
('aruzhan.nurmanova@nu.edu.kz', 'Chiropractic'),
('ulpan.beken@nu.edu.kz', 'Psychology');

insert into Specialize(id, email) VALUES
('1', 'dana.oskenbay@nu.edu.kz'), ('2', 'yeligay.segizbay@nu.edu.kz'), ('3', 'aigerim.bauyrzhanova@nu.edu.kz'), ('4', 'zhibek.rakhymbekkyzy@nu.edu.kz'), ('5','zhibek.rakhymbekkyzy@nu.edu.kz'),
('6', 'ulpan.beken@nu.edu.kz'), ('7', 'assiya.yeraly@nu.edu.kz'), ('8', 'aruzhan.nurmanova@nu.edu.kz'), ('9', 'ayazhan.abdirakhym@nu.edu.kz'), ('10', 'inabbat.torebekkyzy@nu.edu.kz'),
('11', 'zhibek.rakhymbekkyzy@nu.edu.kz'), ('12', 'assiya.yeraly@nu.edu.kz');

insert into PublicServant
VALUES ('anel.kairatova@nu.edu.kz', 'Dept1'),
('akmaral.amanturdieva@nu.edu.kz', 'Dept2'),
('alfiya.lugma@nu.edu.kz', 'Dept1'), 
('anel.samadulla@nu.edu.kz', 'Dept2'),
('ayaulym.raikhankyzy@nu.edu.kz', 'Dept3'),
('zhanel.auyezova@nu.edu.kz', 'Dept3'), 
('mokhira.atashikova@nu.edu.kz', 'Dept1'),
('feruza.tursunmetova@nu.edu.kz', 'Dept3'),
('zhuldyz.namazbayeva@nu.edu.kz', 'Dept2'),
('assem.sansyzbay@nu.edu.kz', 'Dept2'),
('kamila.salimzhanova@nu.edu.kz', 'Dept3');

insert into Record(email, cname, "disease code", "total deaths", "total patients")
VALUES ('akmaral.amanturdieva@nu.edu.kz', 'China', 'covid-19', '4636', '97320'), 
('akmaral.amanturdieva@nu.edu.kz', 'Germany', 'covid-19', '95838', '4623569'),
('akmaral.amanturdieva@nu.edu.kz', 'France', 'covid-19', '119238', '7260347'),
('akmaral.amanturdieva@nu.edu.kz', 'Japan', 'covid-19', '18282', '1720891'),
('alfiya.lugma@nu.edu.kz', 'China',  'covid-19', '4636', '97320'),
('alfiya.lugma@nu.edu.kz', 'France', 'covid-19', '119238', '7260347'),
('ayaulym.raikhankyzy@nu.edu.kz', 'Italy', 'influenza', '68103', '3259618'),
('zhanel.auyezova@nu.edu.kz', 'Russia', 'influenza', '68103', '3259618'), 
('feruza.tursunmetova@nu.edu.kz', 'Brazil', 'herpes', '5', '640146'),
('zhuldyz.namazbayeva@nu.edu.kz', 'United States', 'hiv', '701389', '1249489'),
('assem.sansyzbay@nu.edu.kz', 'South Korea', 'salmonella', '1410', '9472'),
('kamila.salimzhanova@nu.edu.kz', 'France', 'syphilis', '23', '252837');