import {app} from '../app'
import supertest from 'supertest'

describe('Positive case scenerios', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(() => {
    request = supertest(app)
  })

  describe('first test', () => {
    it('returns 200 for get categories without id', async () => {
      const response = await request
        .get('/api/categories')
        .send({
          
        })
      var parsedData = JSON.parse(JSON.stringify(response));
      var body = JSON.parse(parsedData.text);
      expect(body.status).toBe(200)
    })

    it('returns 200 for get categories with id', async () => {
      const response = await request
        .get('/api/categories?id=4')
        .send({
          
        })
      var parsedData = JSON.parse(JSON.stringify(response));
      var body = JSON.parse(parsedData.text);
      expect(body.status).toBe(200)
    })
  })
})

describe('Negative case scenerios', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(() => {
    request = supertest(app)
  })

  describe('first negative test', () => {
    it('returns a text for get category id that does not exist', async () => {
      const response = await request
        .get('/api/categories?id=11')
        .send({
          
        })
      var parsedData = JSON.parse(JSON.stringify(response));
      var body = JSON.parse(parsedData.text);
      expect(body).toBe("Parent ID does not exist")
    })
  })
})