CREATE KEYSPACE IF NOT EXISTS mingblog WITH REPLICATION =
{'class' : 'SimpleStrategy',
'replication_factor' : '1'
};

CREATE TABLE IF NOT EXISTS mingblog.posts (
    id timeuuid PRIMARY KEY,
    title text,
    content text,
    images set<text>,
    videos set<text>,
    last_update_timestamp timestamp
);

INSERT INTO mingblog.posts
    (id, title, content, images, videos, last_update_timestamp)
    VALUES (
        now(), 
        'sample title over here', 
        'this is conetent reight here yep yep krrt sklrrtt', 
        {},
        {},
        toTimeStamp(now()));
