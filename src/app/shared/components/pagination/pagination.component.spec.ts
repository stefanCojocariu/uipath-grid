import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { ComponentRef } from '@angular/core';
import { getPageSizeOptions } from '../../consts/page-size-options';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let componentRef: ComponentRef<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('currentPage', 0);
    componentRef.setInput('pageSize', 20);
    componentRef.setInput('pageSizeOptions', getPageSizeOptions());
    componentRef.setInput('totalPages', 10);
    componentRef.setInput('totalRows', 200);
    componentRef.setInput('disabled', false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangePage', () => {
    it('should emit next page if next page is between 0 and total pages', () => {
      const spy = spyOn(component.changePage, 'emit');
      component.onChangePage(1);

      expect(spy).toHaveBeenCalledOnceWith(1);
    });

    it('shouldnt emit next page if next page is less than 0', () => {
      const spy = spyOn(component.changePage, 'emit');
      component.onChangePage(-1);

      expect(spy).not.toHaveBeenCalled();
    });

    it('shouldnt emit next page if next page bigger than total pages', () => {
      componentRef.setInput('currentPage', 9);
      const spy = spyOn(component.changePage, 'emit');
      component.onChangePage(1);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onPageSizeChange', () => {
    it('should emit null if page size comes null string', () => {
      const spy = spyOn(component.pageSizeChange, 'emit');
      component.onPageSizeChange({ target: { value: 'null' } } as any as Event);

      expect(spy).toHaveBeenCalledOnceWith(null);
    });

    it('should emit value if page size is different than null string', () => {
      const spy = spyOn(component.pageSizeChange, 'emit');
      component.onPageSizeChange({ target: { value: 20 } } as any as Event);

      expect(spy).toHaveBeenCalledOnceWith(20);
    });
  });
});
