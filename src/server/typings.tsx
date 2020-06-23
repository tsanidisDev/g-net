export interface ServerRoute {
    path: string;
    exact: boolean;
    component: any;
    loadData: (e?: string) => void;
}
