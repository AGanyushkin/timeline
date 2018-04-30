#include <stdarg.h>
#include <stddef.h>
#include <setjmp.h>
#include <cmocka.h>

/* A test case that does nothing and succeeds. */
static void null_test(void **state) {
    (void) state; /* unused */
}

static void values_test(void **state) {
	assert_int_equal(3, 3);
	assert_int_not_equal(3, 4);
}

static int gr_setup(void **state) {
     return 0;
}

static int gr_teardown(void **state) {
     return 0;
}

int main(void) {
     const struct CMUnitTest tests[] = {
        cmocka_unit_test(null_test),
	    cmocka_unit_test(values_test),
     };

     return cmocka_run_group_tests(tests, NULL, NULL);
}

