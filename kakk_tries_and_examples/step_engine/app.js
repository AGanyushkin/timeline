function def(type) {
    let action = {
        type
    };
    let creator = () => action;
    creator.toString = () => {
        return type
    };
    return creator;
}

let a1 = def('A1');
let a2 = def('A2');
let a3 = def('A3');

let kakka = {};

kakka.steps(
    a1,
    {
        data: 'someData'
    },
    {
        [a1]: {
            in: (payload, data) => {},
            edges: [a2, a10]
        },
        [a2]: {
            in: [aX],
            edges: [a3]
        }
    },
    a3
);


kakka.steps(
    a1,
    {
        data: 'someData'
    },
    [
        {
            active: true,
            trigger: [a1],
            exec: (payload, data) => {}
        },
        {
            trigger: [a2],
            throw: [aX]
        }
    ],
    a3
);


let stepMachibe = {
    state: {
        step: null
    },
    description: {
        startAction: a1,
        stopAction: a3,
        steps: {
            [a1]: {
                in: () => console.log('A1 in'),
                out: () => console.log('A1 out'),
                edges: {
                    [a2]: () => { console.log('check A2'); return true }
                }
            },
            [a2]: {
                in: () => console.log('A2 in'),
                out: () => console.log('A2 out'),
                edges: {
                    [a3]: () => { console.log('check A3'); return true }
                }
            }
        }
    }
};

function initMachine() {
    stepMachibe.description.startAction = `${stepMachibe.description.startAction}`;
    stepMachibe.description.stopAction = `${stepMachibe.description.stopAction}`;

    stepMachibe.state.step = stepMachibe.description.startAction;
    let step = stepMachibe.description.steps[stepMachibe.state.step];
    step.in();
}

function doIn() {
    stepMachibe.description.steps[stepMachibe.state.step].in();
}

function doOut(step) {
    step.out();
}

function isEnd() {
    return stepMachibe.description.stopAction === stepMachibe.state.step;
}

function doCheckEdgeConditions(step) {
    let edgeKeys = Object.keys(step.edges)
            .filter(edgeKey => step.edges.hasOwnProperty(edgeKey));

    let nextEdgeKey = null;
    for (let edgeKey of edgeKeys) {
        if (step.edges[edgeKey]()) {
            nextEdgeKey = edgeKey;
            break;
        }
    }

    return nextEdgeKey;
}

function doStep(payload) {
    if (stepMachibe.state.step === null) initMachine();
    let curAction = stepMachibe.state.step;

    if (stepMachibe.description.steps.hasOwnProperty(curAction)) {
        let step = stepMachibe.description.steps[curAction];

        let nextEdgeKey = doCheckEdgeConditions(step);

        if (nextEdgeKey) {
            doOut(step);
            stepMachibe.state.step = nextEdgeKey;
            if (isEnd()) {
                return false;
            } else {
                doIn();
                return true;
            }
        } else {
            return true;
        }
    } else {
        throw new Error('Invalid action');
    }
}

let barier = 3;
while (doStep() && --barier) {};
