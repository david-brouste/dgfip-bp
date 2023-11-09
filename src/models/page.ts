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
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;

    constructor(
        page = FIRST_PAGE,
        pageSize = DEFAULT_PAGE_SIZE
    ) {
        this.offset = page * pageSize;
        this.pageNumber = page;
        this.pageSize = pageSize;
        this.paged = true;
        this.sort = new Sort();
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
        pageSize = DEFAULT_PAGE_SIZE
    ) {
        page = page < 0 ? FIRST_PAGE : page;
        pageSize = pageSize < 1 ? DEFAULT_PAGE_SIZE : pageSize;
        items = items ?? [];
        const totalElements = items.length;
        const totalPages = Math.ceil(totalElements / pageSize);
        const startIndex = page * pageSize;
        let endIndex = (page + 1) * pageSize;
        endIndex = endIndex > totalElements ? totalElements : endIndex;

        this.content = items.slice(startIndex, endIndex);
        this.empty = !this.content || this.content.length === 0;
        this.first = page === FIRST_PAGE;
        this.last = page >= totalPages - 1;
        this.number = startIndex;
        this.numberOfElements = pageSize;
        this.pageable = new Pageable(page, pageSize);
        this.size = pageSize;
        this.sort = new Sort();
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }
}