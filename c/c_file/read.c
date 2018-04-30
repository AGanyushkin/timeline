#include <stdio.h>
#include <stdlib.h>

#define N 1e8

struct Pont {
	double x;
	double y;
	double z;
};

void printPoints(struct Pont *points) {
	printf("---points---\n");
	int i;
	for (i = 0; i < 10; i++) {
		printf("%f, %f, %f\n", points[i].x, points[i].y, points[i].z);
	}
}

void readFromFile(char* filename, struct Pont *points) {
	FILE *f;
	f = fopen(filename, "r");

	fread(points, N * sizeof(*points), 1, f);

	fclose(f);
}

int main() {

	struct Pont *points = NULL;
	points = malloc(N * sizeof *points);

	if (points == NULL) {
		printf("can't allocate memory");
		return 1;
	}

	printf("array address: %p\n", points);

	// printPoints(points);

	readFromFile("data_3.bin", points);

	printPoints(points);

	free(points);

	return 0;
}
