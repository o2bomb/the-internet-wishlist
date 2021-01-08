import { MigrationInterface, QueryRunner } from "typeorm";

export class MockEntries1610011548186 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Coordinator', 'grow 24/7 portals', 1, '3/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer Analyst II', 'aggregate B2B supply-chains', 4, '9/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Quality Control', 'transform killer e-tailers', 3, '3/17/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Accounting', 'evolve clicks-and-mortar applications', 1, '5/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Business Systems Development Analyst', 'e-enable ubiquitous synergies', 5, '8/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Research Nurse', 'evolve sticky functionalities', 3, '10/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Graphic Designer', 'incentivize strategic schemas', 3, '5/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Research Assistant IV', 'productize end-to-end methodologies', 1, '2/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Health Coach III', 'implement compelling initiatives', 5, '5/25/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Accountant IV', 'incubate clicks-and-mortar web-readiness', 1, '5/16/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiter', 'integrate sexy channels', 4, '8/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'redefine real-time e-services', 3, '7/29/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Associate Professor', 'incentivize seamless systems', 5, '5/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Paralegal', 'matrix visionary web services', 5, '7/16/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer Analyst I', 'implement granular deliverables', 4, '11/20/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Product Management', 'empower sexy systems', 5, '4/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Structural Engineer', 'innovate compelling vortals', 1, '7/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Actuary', 'strategize mission-critical channels', 3, '5/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Administrative Assistant I', 'whiteboard rich initiatives', 5, '1/18/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Developer IV', 'scale distributed metrics', 1, '1/27/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Assistant Professor', 'repurpose rich infrastructures', 4, '4/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Speech Pathologist', 'empower robust e-commerce', 3, '12/20/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Specialist', 'innovate real-time e-markets', 3, '12/1/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Database Administrator III', 'synergize next-generation infomediaries', 5, '7/17/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Quality Engineer', 'brand impactful architectures', 4, '11/28/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Media Manager IV', 'empower frictionless e-commerce', 1, '5/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Quality Engineer', 'brand clicks-and-mortar interfaces', 5, '1/27/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Product Management', 'incubate viral ROI', 1, '8/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Financial Advisor', 'engage bricks-and-clicks supply-chains', 5, '8/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Tech', 'mesh transparent paradigms', 1, '9/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Sales Associate', 'aggregate best-of-breed niches', 3, '11/23/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Systems Administrator III', 'exploit user-centric metrics', 3, '12/21/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Software Engineer I', 'empower sexy paradigms', 3, '7/9/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Engineer III', 'revolutionize out-of-the-box action-items', 4, '5/12/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Developer', 'drive viral methodologies', 3, '6/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'reintermediate cutting-edge mindshare', 1, '6/18/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Structural Analysis Engineer', 'productize turn-key markets', 3, '1/18/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer II', 'productize magnetic technologies', 5, '3/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Clinical Specialist', 'synthesize 24/7 e-commerce', 3, '11/14/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer Analyst II', 'extend transparent ROI', 1, '2/10/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Tech', 'architect compelling models', 1, '12/13/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Food Chemist', 'matrix bleeding-edge synergies', 1, '12/15/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiter', 'redefine turn-key convergence', 4, '12/27/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Office Assistant II', 'aggregate efficient partnerships', 4, '12/16/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Research Assistant III', 'strategize sticky technologies', 1, '10/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Software Test Engineer III', 'reinvent world-class functionalities', 1, '8/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analyst Programmer', 'transition holistic paradigms', 3, '10/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'matrix granular deliverables', 1, '6/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Tax Accountant', 'repurpose magnetic users', 3, '12/31/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analyst Programmer', 'implement compelling infomediaries', 3, '5/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Quality Control', 'leverage distributed supply-chains', 4, '7/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Automation Specialist III', 'incubate leading-edge schemas', 1, '4/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Administrative Officer', 'morph value-added convergence', 3, '1/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Assistant Professor', 'utilize dot-com networks', 5, '11/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Project Manager', 'facilitate robust convergence', 4, '9/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Junior Executive', 'leverage cross-media interfaces', 4, '8/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Director of Sales', 'innovate dot-com vortals', 3, '8/16/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Chemical Engineer', 'streamline distributed networks', 4, '2/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiter', 'deliver collaborative models', 4, '6/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiter', 'transition extensible e-services', 5, '6/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'strategize compelling interfaces', 5, '6/23/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Junior Executive', 'recontextualize interactive initiatives', 3, '8/28/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Clinical Specialist', 'expedite real-time metrics', 4, '2/14/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Office Assistant IV', 'grow wireless experiences', 4, '2/10/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'matrix real-time e-tailers', 1, '9/23/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Paralegal', 'incentivize bricks-and-clicks synergies', 5, '6/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Safety Technician III', 'envisioneer extensible synergies', 3, '4/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'redefine compelling partnerships', 5, '1/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer III', 'grow killer methodologies', 1, '10/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Developer IV', 'revolutionize intuitive synergies', 3, '2/17/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Product Management', 'aggregate bricks-and-clicks supply-chains', 5, '10/10/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Quality Engineer', 'scale strategic content', 5, '1/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Statistician II', 'incubate mission-critical applications', 4, '5/9/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Web Designer III', 'enable dot-com synergies', 4, '3/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Business Systems Development Analyst', 'incubate frictionless infrastructures', 5, '11/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'monetize rich models', 4, '8/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Cost Accountant', 'synergize out-of-the-box eyeballs', 1, '12/22/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Human Resources Assistant III', 'disintermediate dot-com web services', 3, '1/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Human Resources Assistant IV', 'implement next-generation relationships', 5, '1/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analyst Programmer', 'target 24/7 niches', 5, '6/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'synthesize real-time convergence', 1, '12/14/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Data Coordiator', 'target best-of-breed platforms', 4, '4/20/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Specialist', 'generate B2B channels', 3, '5/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'target user-centric experiences', 1, '5/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Assistant Manager', 'orchestrate customized supply-chains', 4, '12/19/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Budget/Accounting Analyst I', 'enable seamless supply-chains', 4, '9/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Developer I', 'grow end-to-end markets', 1, '8/30/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Dental Hygienist', 'disintermediate seamless vortals', 5, '6/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Director of Sales', 'repurpose 24/365 convergence', 5, '12/26/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Associate Professor', 'morph open-source schemas', 4, '9/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Office Assistant IV', 'deliver seamless experiences', 5, '10/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst II', 'syndicate leading-edge paradigms', 3, '12/17/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('General Manager', 'aggregate 24/7 e-services', 1, '9/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'orchestrate granular e-services', 4, '8/22/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Chief Design Engineer', 'integrate global synergies', 4, '9/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Occupational Therapist', 'extend virtual relationships', 1, '7/20/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Quality Engineer', 'scale intuitive e-commerce', 4, '3/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Assistant Media Planner', 'visualize cutting-edge paradigms', 3, '10/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Legal Assistant', 'morph leading-edge niches', 1, '6/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Internal Auditor', 'visualize leading-edge solutions', 5, '8/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Tax Accountant', 'monetize synergistic partnerships', 5, '7/29/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Software Test Engineer I', 'embrace best-of-breed technologies', 1, '12/10/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Nuclear Power Engineer', 'transition one-to-one systems', 1, '1/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiter', 'optimize revolutionary applications', 4, '11/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Software Test Engineer III', 'grow integrated portals', 5, '10/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Editor', 'repurpose enterprise ROI', 1, '11/30/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Cost Accountant', 'mesh global communities', 4, '4/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Executive', 'incentivize plug-and-play e-tailers', 1, '8/31/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Specialist', 'leverage magnetic technologies', 3, '3/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Geologist III', 'productize efficient e-services', 4, '4/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Research Nurse', 'extend next-generation methodologies', 5, '8/12/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiting Manager', 'scale visionary content', 4, '8/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer III', 'drive virtual ROI', 3, '10/10/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Structural Analysis Engineer', 'implement user-centric infrastructures', 1, '8/12/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Cost Accountant', 'exploit integrated systems', 4, '12/30/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Web Developer I', 'drive plug-and-play methodologies', 5, '1/12/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'engage visionary initiatives', 1, '2/14/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Research Associate', 'harness revolutionary architectures', 4, '11/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Marketing', 'syndicate synergistic networks', 1, '10/14/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Food Chemist', 'envisioneer B2B infrastructures', 3, '7/17/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Information Systems Manager', 'engineer impactful users', 4, '8/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Manager', 'disintermediate web-enabled functionalities', 4, '1/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Dental Hygienist', 'repurpose granular bandwidth', 4, '6/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Editor', 'transform holistic bandwidth', 3, '7/22/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analyst Programmer', 'transition enterprise systems', 3, '2/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Sales', 'scale proactive relationships', 5, '8/31/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Marketing', 'disintermediate user-centric vortals', 5, '11/25/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Speech Pathologist', 'engage end-to-end experiences', 3, '7/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Health Coach III', 'unleash customized web services', 5, '4/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Quality Control Specialist', 'whiteboard e-business platforms', 1, '5/27/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'generate robust vortals', 1, '9/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst IV', 'transition sexy bandwidth', 4, '11/22/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Registered Nurse', 'mesh out-of-the-box ROI', 1, '7/7/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'whiteboard open-source experiences', 1, '9/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Nurse', 'evolve customized portals', 4, '10/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('VP Marketing', 'disintermediate magnetic e-business', 4, '6/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Nuclear Power Engineer', 'generate B2C methodologies', 3, '9/18/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Financial Advisor', 'syndicate efficient models', 5, '10/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Programmer II', 'brand proactive synergies', 5, '11/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Web Developer I', 'utilize mission-critical systems', 5, '7/30/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Systems Administrator II', 'mesh mission-critical bandwidth', 3, '12/9/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Payment Adjustment Coordinator', 'embrace vertical ROI', 1, '2/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Director of Sales', 'integrate efficient methodologies', 3, '1/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'morph plug-and-play e-business', 3, '5/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Nurse Practicioner', 'visualize next-generation users', 5, '8/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Geologist IV', 'generate seamless systems', 4, '3/22/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Developer', 'maximize impactful e-commerce', 5, '5/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Executive Secretary', 'unleash frictionless vortals', 1, '10/31/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'e-enable B2B action-items', 1, '11/28/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'e-enable viral platforms', 4, '5/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Mechanical Systems Engineer', 'drive extensible deliverables', 5, '1/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Financial Advisor', 'disintermediate clicks-and-mortar networks', 1, '5/25/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Community Outreach Specialist', 'target bricks-and-clicks channels', 4, '1/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Coordinator', 'empower global convergence', 1, '5/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Civil Engineer', 'facilitate killer mindshare', 5, '9/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Internal Auditor', 'visualize wireless models', 5, '10/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Pharmacist', 'harness sticky convergence', 4, '3/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Biostatistician III', 'transform wireless supply-chains', 5, '5/28/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Statistician II', 'leverage out-of-the-box supply-chains', 4, '10/14/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Dental Hygienist', 'reinvent efficient infomediaries', 5, '10/15/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'engineer value-added web services', 3, '5/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Specialist', 'engage visionary infrastructures', 5, '7/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'monetize visionary experiences', 3, '1/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Budget/Accounting Analyst I', 'aggregate out-of-the-box communities', 4, '11/11/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Environmental Tech', 'redefine seamless convergence', 4, '1/26/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Technical Writer', 'exploit collaborative convergence', 3, '12/4/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Food Chemist', 'embrace robust functionalities', 4, '11/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Web Developer IV', 'morph value-added e-commerce', 3, '10/10/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('General Manager', 'mesh back-end infrastructures', 5, '6/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'exploit seamless functionalities', 1, '8/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('General Manager', 'seize mission-critical functionalities', 5, '2/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Manager', 'exploit end-to-end convergence', 5, '6/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analog Circuit Design manager', 'architect virtual methodologies', 1, '1/20/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Financial Analyst', 'syndicate compelling solutions', 1, '5/9/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Occupational Therapist', 'expedite B2C experiences', 1, '7/29/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'leverage cross-media technologies', 3, '12/9/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Nurse', 'innovate dynamic infrastructures', 4, '5/8/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Food Chemist', 'leverage B2C niches', 4, '3/21/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'syndicate strategic synergies', 4, '11/24/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'mesh collaborative users', 1, '9/9/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Social Worker', 'evolve clicks-and-mortar interfaces', 3, '3/25/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Staff Accountant I', 'brand dot-com e-markets', 4, '10/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Developer', 'streamline cross-platform e-services', 3, '3/1/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Software Engineer III', 'morph web-enabled infrastructures', 1, '10/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Junior Executive', 'revolutionize bricks-and-clicks platforms', 5, '12/16/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Coordinator', 'productize web-enabled solutions', 1, '2/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Associate Professor', 'maximize web-enabled e-markets', 5, '7/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Analyst Programmer', 'productize integrated markets', 1, '8/6/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Staff Accountant III', 'syndicate compelling interfaces', 3, '8/13/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Clinical Specialist', 'morph clicks-and-mortar markets', 4, '8/23/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('GIS Technical Architect', 'productize killer interfaces', 1, '4/4/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Clinical Specialist', 'facilitate cross-media partnerships', 5, '8/18/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Executive', 'aggregate value-added schemas', 4, '2/27/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Senior Quality Engineer', 'generate synergistic architectures', 1, '5/5/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Pharmacist', 'generate enterprise bandwidth', 1, '7/19/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Registered Nurse', 'enhance extensible metrics', 1, '9/2/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Web Developer III', 'e-enable bleeding-edge relationships', 5, '12/7/2019');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Recruiting Manager', 'deploy 24/365 experiences', 1, '10/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Registered Nurse', 'aggregate rich schemas', 1, '2/3/2020');
    //     insert into entry (title, text, "creatorId", "createdAt") values ('Account Representative IV', 'synthesize open-source applications', 4, '2/23/2020');    
    //     `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
