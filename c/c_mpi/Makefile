# Compiler flags: all warnings + debugger meta-data
CFLAGS = -Wall -g

# The final executable program file, i.e. name of our program
BIN = try1

# Object files from which $BIN depends
OBJS = code.o

CC = mpicc

# This default rule compiles the executable program
$(BIN): $(OBJS) $(BIN).c
	$(CC) $(CFLAGS) $(OBJS) $(BIN).c -o $(BIN)

# This rule compiles each module into its object file
%.o: %.c %.h
	$(CC) -c $(CFLAGS) $< -o $@

clean:
	rm -f *~ *.o $(BIN)

depend:
	makedepend -Y -- $(CFLAGS) -- *.c
