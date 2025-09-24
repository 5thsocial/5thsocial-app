import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { NavService } from "./nav.service";

// Define types for better type safety
interface App {
  key?: string;
  id?: string;
  label: string;
  disabled?: boolean;
  components?: Component[];
}

interface Component {
  key?: string;
  id?: string;
  label: string;
  view?: string;
  icon?: string;
  type?: string;
  workflows?: Workflow[];
}

interface Workflow {
  key?: string;
  label: string;
  view?: string;
  type?: string;
  icon?: string;
}

interface MenuResponse {
  menu: MenuItemResponse[];
  defaultRoute?: { app: string; view: string };
}

interface MenuItemResponse {
  key: string;
  label: string;
  app: string;
  view: string;
  icon: string;
}

@Controller("nav")
export class NavController {
  constructor(private readonly svc: NavService) {}

  @Get()
  async manifest() {
    return this.svc.latest();
  }

  @Post()
  async put(@Headers("authorization") auth: string, @Body() body: any) {
    const token = auth?.replace(/^Bearer\s+/i, "");
    return this.svc.upsert(token, body);
  }

  @Get("state")
  async state() {
    return this.svc.state();
  }

  @Get("apps")
  async apps() {
    const mf = await this.svc.latest();
    
    // Let's debug what's in mf.apps
    console.log('Full manifest:', JSON.stringify(mf, null, 2));
    
    const apps = (mf.apps || [])
      .filter((a: App) => !a.disabled)
      .map((a: App) => ({
        key: a.key || a.id || a.label, // Keep original case
        label: a.label,
        disabled: a.disabled || false,
      }));
    return { apps };
  }

  @Get("menu")
  async menu(@Query("app") app: string): Promise<MenuResponse> {
    const mf = await this.svc.latest();
    
    console.log('Looking for app:', app);
    console.log('Full manifest data:', JSON.stringify(mf, null, 2));
    console.log('Available apps:', mf.apps?.map((a: App) => ({ 
      key: a.key, 
      label: a.label, 
      components: a.components?.length || 0,
      hasComponents: !!a.components
    })));
    
    // More flexible app matching - try exact match first, then case-insensitive
    const found = (mf.apps || []).find((a: App) => {
      const appKey = a.key || a.id || a.label;
      const appLabel = a.label;
      console.log(`Checking app: key="${appKey}", label="${appLabel}" against "${app}"`);
      return appKey === app || 
             appLabel === app || 
             appKey?.toLowerCase() === app?.toLowerCase() ||
             appLabel?.toLowerCase() === app?.toLowerCase();
    });
    
    console.log('Found app:', found);
    console.log('Found app components:', found?.components);
    console.log('Components length:', found?.components?.length);
    
    if (!found) {
      console.log('No app found');
      return { menu: [], defaultRoute: undefined };
    }
    
    if (!found.components) {
      console.log('App found but no components property');
      return { menu: [], defaultRoute: undefined };
    }
    
    if (found.components.length === 0) {
      console.log('App found but components array is empty');
      return { menu: [], defaultRoute: undefined };
    }

    const menu: MenuItemResponse[] = [];

    // Process each component
    for (const component of found.components) {
      console.log('Processing component:', JSON.stringify(component, null, 2));
      
      if (component.workflows && component.workflows.length > 0) {
        // Add the main component
        menu.push({
          key: component.key || component.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
          label: component.label,
          app,
          view: component.view || component.label,
          icon: component.icon || '📝'
        });
        
        // Add workflow items as sub-menu
        component.workflows.forEach((workflow: Workflow) => {
          menu.push({
            key: workflow.key || workflow.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
            label: `  ${workflow.label}`, // Indent to show it's a sub-item
            app,
            view: workflow.view || workflow.label?.replace(/\s+/g, '') || 'unknown',
            icon: workflow.icon || '⚡'
          });
        });
      } else {
        // Regular component
        menu.push({
          key: component.key || component.label?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
          label: component.label,
          app,
          view: component.view || component.label,
          icon: component.icon || '📄'
        });
      }
    }

    console.log('Generated menu:', menu);

    const defaultRoute = menu[0] ? { app, view: menu[0].view } : undefined;
    return { menu, defaultRoute };
  }
}