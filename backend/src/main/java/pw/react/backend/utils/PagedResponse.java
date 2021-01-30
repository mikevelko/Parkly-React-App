package pw.react.backend.utils;

import org.springframework.data.domain.PageRequest;

public class PagedResponse<T> {
    private int pageCount;
    private int pageSize;
    private int pageNumber;
    private T data;

    public T GetData(){
        return data;
    }
    public int GetPageCount(){
        return pageCount;
    }
    public int GetPageSize(){
        return pageSize;
    }
    public int GetPageNumber(){
        return pageNumber;
    }
    public PagedResponse(T data, int page, int size, int pageCount){
        this.data = data;
        this.pageNumber = page;
        this.pageSize = size;
        this.pageCount = pageCount;
    }
}
