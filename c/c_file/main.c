#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <sys/sysinfo.h>

#define N 1e8

struct Point {
	double x;
	double y;
	double z;
};

struct ThreadArgs {
	struct Point *points;
	int n;
	int thid;
	int pool;
};

void initPoints(struct Point *points) {
	int i;
	for (i = 0; i < N; i++) {
		points[i].x = 0.1 * i;
		points[i].y = 0.2 * i;
		points[i].z = 0.3 * i;
	}
}

void printPoints(struct Point *points) {
	printf("---points---\n");
	int i;
	for (i = 0; i < 10; i++) {
		printf("%f, %f, %f\n", points[i].x, points[i].y, points[i].z);
	}
}

void storeToFile(char* filename, struct Point *points) {
	FILE *f;
	f = fopen(filename, "w");

	fwrite(points, N * sizeof(*points), 1, f);

	fclose(f);
}

void *handle(void *vargs) {
	struct ThreadArgs *thArgs = (struct ThreadArgs *)vargs;

	printf("Thread processing: id/pool= %i/%i; N= %i, points= %p\n", thArgs->thid, thArgs->pool, thArgs->n, thArgs->points);

	struct Point *points = thArgs->points;
	int i;
	for (i = 0; i < N; i++) {
		points[i].x += i * 0.00001;
		points[i].y += i * 0.00002;
		points[i].z += i * 0.00003;
	}

	free(thArgs);
}

int main() {

	struct Point *points = NULL;
	points = malloc(N * sizeof *points);

	if (points == NULL) {
		printf("can't allocate memory");
		return 1;
	}

	printf("array address: %p\n", points);

	printf("initialization...\n");
	initPoints(points);

	printf("handling...\n");

	int t;
	int THREADS = get_nprocs();
	pthread_t tids[THREADS];
	for (t = 0; t < THREADS; t++) {
		struct ThreadArgs *thArgs = malloc(sizeof *thArgs);
		// need to have NULL check here.
		thArgs->points = points;
		thArgs->n = N;
		thArgs->thid = t;
		thArgs->pool = THREADS;

		pthread_create(&tids[t], NULL, handle, (void *)thArgs);
	}

	printf("waiting threads...\n");
	for (t = 0; t < THREADS; t++) {
		pthread_join(tids[t], NULL);
	}

	printPoints(points);

	printf("storing...\n");
	storeToFile("data_3.bin", points);

	free(points);

	return 0;
}
