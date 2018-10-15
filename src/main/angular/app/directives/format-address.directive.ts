import { ChangeDetectorRef, ElementRef, EventEmitter, Directive, HostListener, OnInit, Output } from '@angular/core';
import { Venue } from '../model/venue';

declare var google: any;

@Directive({
  selector: '[format-address]'
})
export class FormatAddressDirective {

  @Output('formatted-address') emitter: EventEmitter<any>;
  geocoder: any;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
    this.emitter = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  @HostListener('blur')
  @HostListener('click')
  validateAddress() {
    this.geocode(this.el.nativeElement.value);
  }

  geocode(address: string) {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }

    let self = this;
    console.debug("Geocoding address: '" + address + "'...");
    this.geocoder.geocode({'address': address }, function(results, status) {
      console.debug("Geocode complete: " + status);
      if (status == google.maps.GeocoderStatus.OK) {
        console.debug(results[0]);
        let addr = results[0].formatted_address;
        let latlng = results[0].geometry.location;

        if (addr !== null) {
          let numCommas = addr.match(/,/g).length;
          if (numCommas >= 3) {
              console.debug("Reformatting...");
              addr = addr.replace(/, /, "\n");
              addr = addr.replace(/, USA$/, "");
              console.debug(addr);
          }
        }

        self.emitter.emit(addr);
        self.emitter.emit({lat: latlng.lat(), lng: latlng.lng()});
        self.cdr.detectChanges();
      }
    });
  }
}
