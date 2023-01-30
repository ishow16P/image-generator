import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImageGeneratorComponent } from "./components/smart/image-generator/image-generator.component";

const routes: Routes = [
  {
    path: "",
    component: ImageGeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
