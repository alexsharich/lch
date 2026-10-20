import {Request, Response, Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {db} from "../../db/db";
import {createErrorMessages} from "../../core/utils/error.utils";
import {DriverInputDto} from "../dto/driver.input.dto";
import {validateDriverInputDto} from "../validations/driver-input-dto.validation";
import {DriverType} from "../types/drivers";

export const driversRouter = Router({})
driversRouter
    .get('', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send(db.drivers)
    })
    .get('', (req: Request<{ id: string }>, res: Response) => {
        const driver = db.drivers.find((d) => {
            d.id === +req.params.id
        })
        if (!driver) {
            res.status(HttpStatus.NotFound).send(
                createErrorMessages([{
                    field: 'id',
                    message: "Driver not found"
                }])
            )
            return
        }
        res.status(HttpStatus.Ok).send(driver)
    })
    .post('', (req: Request<{}, {}, DriverInputDto>, res: Response) => {
        const errors = validateDriverInputDto(req.body)
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        const lastDriver = db.drivers[db.drivers.length - 1];

        const newDriver: DriverType = {
            id: lastDriver ? lastDriver.id + 1 : 1,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            vehicleMake: req.body.vehicleMake,
            vehicleModel: req.body.vehicleModel,
            vehicleYear: req.body.vehicleYear,
            vehicleLicensePlate: req.body.vehicleLicensePlate,
            vehicleDescription: req.body.vehicleDescription,
            vehicleFeatures: req.body.vehicleFeatures,
            createdAt: new Date(),
        };

        db.drivers.push(newDriver);
        res.status(HttpStatus.Created).send(newDriver);
    })
    .put(
        '/:id',
        (req: Request<{ id: string }, {}, DriverInputDto>, res: Response) => {
            const index = db.drivers.findIndex((d) => d.id === +req.params.id);

            if (index === -1) {
                res
                    .status(HttpStatus.NotFound)
                    .send(
                        createErrorMessages([{field: 'id', message: 'Driver not found'}]),
                    );
                return;
            }

            const errors = validateDriverInputDto(req.body);

            if (errors.length > 0) {
                res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
                return;
            }

            db.drivers[index] = {...db.drivers[index], ...req.body};

            res.sendStatus(HttpStatus.NoContent);
        },
    )
    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const index = db.drivers.findIndex((d) => d.id === +req.params.id);

        if (index === -1) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{field: 'id', message: 'Driver not found'}]),
                );
            return;
        }

        db.drivers.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent);
    });