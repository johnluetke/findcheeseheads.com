package com.findcheeseheads.backend.persistence;

public abstract class BaseEntity<M> {

    public abstract M toModel();

    public abstract BaseEntity fromModel(M model);

}
