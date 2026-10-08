# SnapShare Scaling Plan

## Assumptions

* 10 million registered users.
* 10% are active each day.
* Each active user uploads 1 photo per day.
* Each active user views 50 feed pages per day.
* Each photo is 2 MB.
* Each thumbnail is 50 KB.
* 1 day = 86,400 seconds.
* 1 year = 365 days.
* Peak traffic is estimated at 5× average traffic.

## 1. Traffic and Storage Estimates

### Daily Active Users

10,000,000 × 10% = **1,000,000 daily active users**

### Uploads Per Second

1,000,000 uploads/day ÷ 86,400 = **11.57 uploads/second**

Peak:

11.57 × 5 = **57.87 uploads/second**

### Feed Views Per Second

1,000,000 × 50 = **50,000,000 feed views/day**

Average:

50,000,000 ÷ 86,400 = **578.7 feed views/second**

Peak:

578.7 × 5 = **2,893.5 feed views/second**

### Storage Per Year

Each photo requires:

2 MB + 0.05 MB = **2.05 MB**

Daily storage:

1,000,000 × 2.05 MB = **2.05 TB/day**

Annual storage:

2.05 TB × 365 = **748.25 TB/year**

## 2. Read-Heavy or Write-Heavy?

SnapShare is **read-heavy** because users view approximately 579 feed pages per second on average but upload only about 12 photos per second.

The design should therefore prioritize fast reads using a CDN, caching and database read replicas.

## 3. Photo Storage

Photos should not be stored inside the database because large binary files would make the database unnecessarily large and make backups, replication and queries more expensive.

The original photos and thumbnails should be stored in **object storage**, while the database stores metadata such as the photo ID, owner and storage location.

## 4. Architecture Diagram

```text
                    Users
                      |
                      v
                    CDN
                      |
                      v
               Load Balancer
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       App Server  App Server  App Server
          |           |           |
          +-----------+-----------+
                      |
              +-------+-------+
              |               |
              v               v
            Cache         Database
                          Primary
                             |
                             v
                        Read Replica


Photo Upload
     |
     v
Object Storage
     |
     v
   Queue
     |
     v
  Worker
     |
     v
Create Thumbnail
     |
     v
Object Storage
```

## 5. Components

* **CDN:** Delivers photos and thumbnails from locations close to users, reducing latency.
* **Load Balancer:** Distributes requests across multiple app servers.
* **App Servers:** Handle authentication, uploads, feeds and application logic.
* **Cache:** Stores frequently requested data to reduce database load and improve response times.
* **Database:** Stores structured data such as users, posts, follows and photo metadata.
* **Read Replica:** Handles database read queries so the primary database is not overloaded.
* **Object Storage:** Stores the large photo and thumbnail files efficiently.
* **Queue:** Holds background jobs so expensive processing does not block user requests.
* **Worker:** Processes queued jobs and creates thumbnails.

## 6. Photo Upload Flow

1. The user selects a photo.
2. The request reaches the load balancer.
3. The load balancer sends it to an available app server.
4. The app server authenticates the user and validates the photo.
5. The original photo is uploaded to object storage.
6. The database stores the photo metadata and object-storage location.
7. A thumbnail-generation job is added to the queue.
8. The app server responds that the upload was accepted.
9. A worker takes the job from the queue.
10. The worker creates the thumbnail.
11. The thumbnail is stored in object storage.
12. The CDN can then deliver the photo and thumbnail efficiently to users.

## 7. Trade-offs

### Caching vs Freshness

Caching improves performance and reduces database load, but cached feed data can become temporarily outdated.

### Read Replicas vs Consistency

Read replicas allow more read traffic to be handled, but replication can introduce a small delay before new data appears on a replica.

### Asynchronous Processing vs Immediate Availability

Using a queue and worker makes uploads faster, but thumbnails may not be available immediately after an upload.

### Object Storage vs Simplicity

Object storage scales much better for hundreds of terabytes of photos, but it introduces another service that must be managed.

## Summary

SnapShare has **1 million daily active users**, approximately **11.57 uploads/second**, **578.7 feed views/second**, and approximately **748.25 TB of new photo and thumbnail storage per year**.

The system is **read-heavy**, so the architecture relies heavily on the CDN, cache and read replica to handle large volumes of feed requests.
