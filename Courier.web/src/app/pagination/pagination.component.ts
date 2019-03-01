import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { PagerModel } from '../pagermodel/pager.model';
import { PagedDataRequest } from '../PagedDataRequest/pagedDataRequest';
import { PagedDataInquiryResponse } from '../PagedDataEnquiryResponse/pagedDataInquiryResponse';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  /** pagination ctor */

  @Input() pager: PagerModel = new PagerModel();
  @Output() offset = new EventEmitter();
  pagedDataRequest = new PagedDataRequest();
  pagedDataInquiryResponse = new PagedDataInquiryResponse();

  constructor() { }

  ngOnChanges(): void {

  }

  paginate(offset) {
    this.offset.emit(offset);
  }

}

