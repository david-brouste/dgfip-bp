import {DEFAULT_PAGE_SIZE, FIRST_PAGE} from "@/lib/constants";

export class Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
    constructor() {
        this.unsorted = true;
        this.sorted = false;
        this.empty = true
    }
}
export class Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;

    constructor(
        page = FIRST_PAGE,
        pageSize = DEFAULT_PAGE_SIZE
    ) {
        this.sort = new Sort();
        this.offset = page * pageSize;
        this.pageSize = pageSize;
        this.pageNumber = page;
        this.paged = true;
        this.unpaged = false;
    }
}

export class Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
    constructor(
        items: T[]|undefined,
        page = FIRST_PAGE,
        size = DEFAULT_PAGE_SIZE
    ) {
        page = page < 0 ? FIRST_PAGE : page;
        size = size < 1 ? DEFAULT_PAGE_SIZE : size;
        items = items ?? [];
        const totalElements = items.length;
        const totalPages = Math.ceil(totalElements / size);
        const startIndex = page * size;
        let endIndex = (page + 1) * size;
        endIndex = endIndex > totalElements ? totalElements : endIndex;

        this.content = items.slice(startIndex, endIndex);
        this.pageable = new Pageable(page, size);
        this.last = page >= totalPages - 1;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.size = size;
        this.number = startIndex;
        this.sort = new Sort();
        this.first = page === FIRST_PAGE;
        this.numberOfElements = this.content.length;
        this.empty = !this.content || this.content.length === 0;
    }
}