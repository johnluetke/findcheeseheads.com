import { ElementRef, EventEmitter, Directive, HostListener, OnInit, Output } from '@angular/core';
import { Venue } from '../model/venue';

declare var google: any;

@Directive({
  selector: '[format-address]'
})
export class FormatAddressDirective {

  @Output('formatted-address') addr: EventEmitter<string>;
  @Output('latitude') lat: EventEmitter<number>;
  @Output('longitude') lng: EventEmitter<number>;
  geocoder: any;

  constructor(private el: ElementRef) {
    this.addr = new EventEmitter<string>();
    this.lat = new EventEmitter<number>();
    this.lng = new EventEmitter<number>();
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
        let addr = results[0].formatted_address;
        let latlng = results[0].geometry.location;

        if (addr !== null) {
          let numCommas = addr.match(/,/g).length;
          if (numCommas >= 3) {
              addr = addr.replace(/, /, "\n");
              addr = addr.replace(/, USA$/, "");
          }
        }

        self.addr.emit(addr);
        self.lat.emit(latlng.lat());
        self.lng.emit(latlng.lng());
      }
    });
  }
}
