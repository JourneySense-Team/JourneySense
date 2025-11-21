declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  
  // This tells TypeScript that any file ending in .vue is a valid module 
  // that exports a Vue component.
  const component: DefineComponent<{}, {}, any>
  export default component
}