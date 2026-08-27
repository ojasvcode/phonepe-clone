// Simple SPA Router
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.history = [];
    this.onNavigate = null;
  }

  register(name, handler) {
    this.routes[name] = handler;
  }

  async navigate(name, params = {}, back = false) {
    if (this.currentRoute === name && !params.force) return;
    const prev = this.currentRoute;
    this.currentRoute = name;
    if (!back) this.history.push({ name: prev, params: {} });
    if (this.onNavigate) this.onNavigate(name, params, back);
    const handler = this.routes[name];
    if (handler) await handler(params, back);
  }

  async back() {
    if (this.history.length > 1) {
      const prev = this.history.pop();
      if (prev.name) await this.navigate(prev.name, prev.params, true);
    }
  }
}

export const router = new Router();
