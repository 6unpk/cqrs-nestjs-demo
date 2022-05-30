import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.setTimeout(15000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer()).get('/categories').expect(200);
  });
  it('/templates (GET)', () => {
    return request(app.getHttpServer()).get('/templates').expect(200);
  });
  it('/categories/abcd (GET)?lang=ko Korean Response', async () => {
    const res = await request(app.getHttpServer()).get(
      '/categories/abcd?lang=ko',
    );
    expect(res.body.message).toEqual('카테고리를 찾을 수 없습니다.');
    return expect(res.status).toBe(404);
  });
  it('/templates/abcd?lang=ko (GET) Korean Response', async () => {
    const res = await request(app.getHttpServer()).get(
      '/templates/abcd?lang=ko',
    );
    expect(res.body.message).toEqual('템플릿를 찾을 수 없습니다.');
    return expect(res.status).toBe(404);
  });
  it('/categories/abcd?lang=en (GET) English Response', async () => {
    const res = await request(app.getHttpServer()).get(
      '/categories/abcd?lang=en',
    );
    expect(res.body.message).toEqual('Cannot find category.');
    return expect(res.status).toBe(404);
  });
  it('/templates/abcd?lang=en (GET) English Response', async () => {
    const res = await request(app.getHttpServer()).get(
      '/templates/abcd?lang=en',
    );
    expect(res.body.message).toEqual('Cannot find template.');
    return expect(res.status).toBe(404);
  });
  it('/categories (POST) (UPDATE) (DELETE)', async () => {
    const post = await request(app.getHttpServer())
      .post('/categories')
      .type('application/json')
      .send({ name: 'coffee' });

    expect(post.status).toBe(201);

    const put = await request(app.getHttpServer())
      .put(`/categories/${post.body.id}`)
      .type('application/json')
      .send({ name: 'car' });

    expect(put.status).toBe(200);

    const _delete = await request(app.getHttpServer()).delete(
      `/categories/${post.body.id}`,
    );

    return expect(_delete.status).toBe(200);
  });
  it('/templates (POST) (UPDATE) (DELETE)', async () => {
    const post = await request(app.getHttpServer())
      .post('/templates')
      .type('application/json')
      .send({ name: 'americano', categories: [] });

    expect(post.status).toBe(201);

    const put = await request(app.getHttpServer())
      .put(`/templates/${post.body.id}`)
      .type('application/json')
      .send({ name: 'SUV', categories: [] });

    expect(put.status).toBe(200);

    const _delete = await request(app.getHttpServer()).delete(
      `/templates/${post.body.id}`,
    );

    return expect(_delete.status).toBe(200);
  });
});
