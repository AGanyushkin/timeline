#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define N 100

struct Point {
    double x;
    double y;
    double z;
};

int main() {
    
    struct Point *points = NULL;
    
    points = malloc(N * sizeof *points);
    
    srand(time(NULL));
    
    int i;
    for (i = 0; i < N; i++) {
        points[i].x = (double)rand()/RAND_MAX*2.0-1.0;
        points[i].y = (double)rand()/RAND_MAX*2.0-1.0;
        points[i].z = (double)rand()/RAND_MAX*2.0-1.0;
    }

    if (points == NULL) {
        fprintf(stderr, "Allocation failed");
    } else {
        
        printf("%p\n", points);
        for (i = 0; i < N; i++) {
            printf("%f, %f, %f\n", points[i].x, points[i].y, points[i].z);
        }
        
        free(points);
    }

    return 0;
}

