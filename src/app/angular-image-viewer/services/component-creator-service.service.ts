import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

@Injectable()
export class ComponentCreatorServiceService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  appendComponentToBody<T>(component: Type<T>, componentParams?: any): ComponentRef<T> {
    // 1. Crie um componente usando o ComponentFactoryResolver
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);

    // 2. Adicione o componente ao corpo do documento
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // 3. Passar parâmetros para o componente
    if (componentParams) {
      Object.assign(componentRef.instance as any, componentParams);
    }

    return componentRef;
  }
}
