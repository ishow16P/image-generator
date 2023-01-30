import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PromptComponent } from "../../ui/prompt/prompt.component";
import { GalleryComponent } from "../../ui/gallery/gallery.component";
import { ImageGeneratorService } from "src/app/data-access/image-generator.service";
import { BehaviorSubject, of, switchMap, combineLatest, map } from "rxjs";

@Component({
  selector: "app-image-generator",
  standalone: true,
  imports: [CommonModule, PromptComponent, GalleryComponent],
  template: `
    <div *ngIf="vm$ | async as vm">
      <app-prompt (prompted)="prompted($event)"></app-prompt>

      <p *ngIf="vm.prompt">
        Requesting images for: {{ vm.prompt }}
      </p>

      <app-gallery [images]="vm.images"></app-gallery>
    </div>
  `,
  styles: [],
})
export class ImageGeneratorComponent {
  private readonly imageGenerator = inject(ImageGeneratorService);

  private readonly prompt$$ = new BehaviorSubject<string>("");
  private readonly prompt$ = this.prompt$$.asObservable();

  private readonly images$ = this.prompt$.pipe(
    switchMap((value: string) => {
      if (!value) {
        return of([]);
      }
      const data = {
        message: value
      }
      const res = this.imageGenerator.getImages(data);
      console.log(res)
      return res
    })
  );

  public readonly vm$ = combineLatest([this.prompt$, this.images$]).pipe(
    map(([prompt, images]) => ({
      prompt,
      images,
    }))
  );

  public prompted($event: string): void {
    this.prompt$$.next($event);
  }
}
