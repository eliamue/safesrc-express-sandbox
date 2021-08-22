import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Resources from '../lib/models/Resources.js';

describe('demo CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('tests create resource route', async () => {
    const resource = {
      name: 'Tubman Family Crisis and Support Services',
      address: '4432 Chicago Avenue South',
      city: 'Minneapolis',
      city_id: 2,
      county: 'Hennepin',
      zip: 55407,
      usstate: 'MN',
      state_id: 2,
      number: '612-825-0000',
      number2: '612-825-3333',
      email: '',
      website: 'https://www.tubman.org/',
      category: 'Mental Health',
      category_id: 1,
      subcategory: 'General',
    };
    const res = await request(app)
      .post('/api/v1/resources')
      .send(resource);

    expect(res.body).toEqual({
      ...resource,
      id: 1
    });
  });

  it('tests get resource by id route', async () => {
    const resource = {
      name: 'Tubman Family Crisis and Support Services',
      address: '4432 Chicago Avenue South',
      city: 'Minneapolis',
      city_id: 2,
      county: 'Hennepin',
      zip: 55407,
      usstate: 'MN',
      state_id: 2,
      number: '612-825-0000',
      number2: '612-825-3333',
      email: '',
      website: 'https://www.tubman.org/',
      category: 'Mental Health',
      category_id: 1,
      subcategory: 'General',
    };
    await Resources.insert(resource);
    const res = await request(app)
      .get('/api/v1/resources/1');

    expect(res.body).toEqual({
      ...resource,
      id: 1
    });
  });

  it('tests getting all resources', async () => {
    const resource1 = await Resources.insert({
      name: 'Tubman Family Crisis and Support Services',
      address: '4432 Chicago Avenue South',
      city: 'Minneapolis',
      city_id: 2,
      county: 'Hennepin',
      zip: 55407,
      usstate: 'MN',
      state_id: 2,
      number: '612-825-0000',
      number2: '612-825-3333',
      email: '',
      website: 'https://www.tubman.org/',
      category: 'Mental Health',
      category_id: 1,
      subcategory: 'General',
    });

    const resource2 = await Resources.insert({
      name: 'Domestic Violence Resource Center',
      address: '1735 Vassar Street',
      city: 'Reno',
      city_id: 3,
      county: 'Washoe',
      zip: 89502,
      usstate: 'NV',
      state_id: 4,
      number: '775-329-4150',
      number2: '',
      email: 'info@domesticviolenceresourcecenter.org',
      website: 'https://domesticviolenceresourcecenter.org/',
      category: 'Domestic',
      category_id: 2,
      subcategory: 'Domestic Violence',
    });

    const resource3 = await Resources.insert({
      name: 'Multnomah County Animal Services',
      address: '1700 W Historic River Hwy',
      city: 'Troutdale',
      city_id: 4,
      county: 'Multnomah',
      zip: 97060,
      usstate: 'OR',
      state_id: 3,
      number: '503-988-7387',
      number2: '',
      email: '',
      website: 'https://www.multcopets.org/',
      category: 'Animals',
      category_id: 3,
      subcategory: 'Animal Control',
    });

    const resource4 = await Resources.insert({
      name: 'St Paul Animal Control Center',
      address: '1285 Jessamine Avenue West',
      city: 'St Paul',
      city_id: 5,
      county: 'Ramsey',
      zip: 55108,
      usstate: 'MN',
      state_id: 2,
      number: '651-266-1100',
      number2: '651-266-8989',
      email: '',
      website:
        'https://www.stpaul.gov/departments/safety-inspections/animal-control-information',
      category: 'Animals',
      category_id: 3,
      subcategory: 'Animal Control',
    });

    const res = await request(app)
      .get('/api/v1/resources');

    expect(res.body).toEqual([resource1, resource2, resource3, resource4]);
  });

  it('tests making updates a specific resource', async () => {
    const resource = await Resources.insert({
      name: 'Domestic Violence Resource Center',
      address: '1735 Vassar Street',
      city: 'Reno',
      city_id: 3,
      county: 'Washoe',
      zip: 89502,
      usstate: 'NV',
      state_id: 4,
      number: '775-329-4150',
      number2: '',
      email: 'info@domesticviolenceresourcecenter.org',
      website: 'https://domesticviolenceresourcecenter.org/',
      category: 'Domestic',
      category_id: 2,
      subcategory: 'Domestic Violence',
    });

    const res = await request(app)
      .put(`/api/v1/resources/${resource.id}`)
      .send({
        number2: '775-329-2952',
      });
    expect(res.body).toEqual({ ...resource, number2: '775-329-2952' });
  });

  it('tests delete route for removing a specific resource', async () => {
    const resource = await Resources.insert({
      name: 'Urgent Care for Adult Mental & Health Crisis Line',
      address: '402 University Ave',
      city: 'St Paul',
      city_id: 2,
      county: 'Ramsey',
      zip: 55130,
      usstate: 'MN',
      state_id: 2,
      number: '651-266-7900',
      number2: '',
      email: '',
      website:
        'https://www.ramseycounty.us/content/urgent-care-adult-mental-health',
      category: 'Mental Health',
      category_id: 1,
      subcategory: 'Crisis',
    });

    const res = await request(app)
      .delete(`/api/v1/resources/${resource.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${resource.name}.`,
    });
  });
});
