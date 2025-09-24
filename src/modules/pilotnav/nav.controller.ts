import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { NavService } from './nav.service';

@Controller('api/nav')
export class NavController {
  constructor(private readonly svc: NavService) {}

  @Get()
  async manifest() {
    return this.svc.latest();
  }

  @Post()
  async put(@Headers('authorization') auth: string, @Body() body: any) {
    const token = auth?.replace(/^Bearer\s+/i, '');
    return this.svc.upsert(token, body);
  }

  @Get('state')
  async state() { return this.svc.state(); }

  // Optional split endpoints used by frontend lib
  @Get('apps')
  async apps() {
    const mf = await this.svc.latest();
    const apps = (mf.apps || []).map((a:any) => ({ key: a.key || a.id || a.label?.toLowerCase(), label: a.label }));
    return { apps };
  }

  @Get('menu')
  async menu(@Query('app') app: string){
    const mf = await this.svc.latest();
    const found = (mf.apps || []).find((a:any) => (a.key||a.id) === app || a.label === app);
    const menu = found?.components?.map((c:any) => ({ key: c.id || c.key || c.label, label: c.label, app, view: c.view || c.label })) || [];
    const defaultRoute = menu[0] ? { app, view: menu[0].view } : undefined;
    return { menu, defaultRoute };
  }
}
